// Professional Cloud TCO Calculator - Enhanced Version

// Supabase Configuration
const SUPABASE_URL = 'https://nufzsvtxzjriazbqafok.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZnpzdnR4empyaWF6YnFhZm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NjIzNjEsImV4cCI6MjA4NDUzODM2MX0.ez8vhMarcZmQvBM39NC6ZfZ0LpYY5dxQPseRhpKxt8k';

let db;

// Initialize Supabase
try {
    if (typeof supabase === 'undefined') {
        throw new Error("Supabase not loaded");
    }
    const { createClient } = supabase;
    db = createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (err) {
    console.error("Init Error:", err);
}

// Store calculations per tab
let tabCalculations = {
    0: null, // Infrastructure
    1: null, // Environment
    2: null  // Financial
};

let currentCurrency = 'USD';

// Authentication
async function checkSession() {
    const { data: { session } } = await db.auth.getSession();
    const isLoginPage = window.location.pathname.includes('login.html');
    
    if (!session && !isLoginPage) {
        window.location.href = 'login.html';
    } else if (session && isLoginPage) {
        window.location.href = 'index.html';
    }
    return session;
}

async function handleLogin(email, password, isSignUp) {
    if (!email || !password) return alert("Please enter credentials");
    
    let result;
    if (isSignUp) {
        result = await db.auth.signUp({ email, password });
        if (result.error) {
            alert("Signup Error: " + result.error.message);
        } else if (result.data.user && !result.data.session) {
            alert("Check your email to confirm signup");
        } else {
            window.location.href = 'index.html';
        }
    } else {
        result = await db.auth.signInWithPassword({ email, password });
        if (result.error) {
            alert("Login Error: " + result.error.message);
        } else {
            window.location.href = 'index.html';
        }
    }
}

async function logout() {
    await db.auth.signOut();
    window.location.href = 'login.html';
}

// Currency Formatting
function formatCurrency(amount, currency = currentCurrency) {
    const convertedAmount = amount * EXCHANGE_RATES[currency];
    const symbol = currency === 'USD' ? '$' : '₹';
    const formatted = new Intl.NumberFormat('en-IN', { 
        maximumFractionDigits: 0 
    }).format(Math.round(convertedAmount));
    
    return symbol + formatted;
}

// Enhanced TCO Calculation Engine
function calculateEnterpriseTCO(inputs, currentTab = 0) {
    const region = REGIONS[inputs.region];
    const instance = INSTANCE_CATALOG.find(i => i.id === inputs.instance);
    const storage = STORAGE_TIERS.find(s => s.id === inputs.storageType);
    const migration = MIGRATION_COMPLEXITY.find(m => m.id === inputs.migrationType);
    
    const years = parseInt(inputs.duration);
    const discountRate = parseFloat(inputs.discountRate) / 100;
    const count = parseInt(inputs.count);
    const storageSize = parseFloat(inputs.storageSize);
    const dataTransfer = parseFloat(inputs.dataTransfer);
    const pue = parseFloat(inputs.pue);
    
    // Apply regional cost modifier
    const regionalMod = region.costMod;
    
    // === ON-PREMISES COSTS ===
    
    // Initial CapEx
    const serverHwCost = instance.hardwareCost * count;
    const storageHwCost = storageSize * 0.80; // $0.80 per GB for hardware
    const networkHwCost = 50000; // Network equipment
    const facilityCost = count * 5000; // Datacenter buildout per server
    const totalCapEx = (serverHwCost + storageHwCost + networkHwCost + facilityCost) * 1.20; // 20% deployment overhead
    
    // Annual OpEx
    const powerPerServer = 300; // Watts
    const hoursPerYear = 8760;
    const annualPowerCost = ((powerPerServer * hoursPerYear * pue * region.powerCost) / 1000) * count;
    
    const annualCoolingCost = annualPowerCost * 0.40; // Cooling ~40% of power
    const annualSpaceCost = count * 250; // $250 per server/year for space
    const annualMaintenance = totalCapEx * 0.15; // 15% of CapEx for maintenance
    const annualAdminCost = Math.ceil(count / 20) * 85000; // 1 admin per 20 servers
    const annualSoftwareLicenses = count * 500; // OS, monitoring, etc.
    
    const totalAnnualOpEx = annualPowerCost + annualCoolingCost + annualSpaceCost + 
                            annualMaintenance + annualAdminCost + annualSoftwareLicenses;
    
    // Calculate yearly cash flows with inflation
    let onPremCashFlow = [];
    let totalOnPrem = totalCapEx;
    
    for (let y = 1; y <= years; y++) {
        const inflationFactor = Math.pow(1.03, y); // 3% annual inflation
        const yearlyOpEx = totalAnnualOpEx * inflationFactor;
        onPremCashFlow.push(yearlyOpEx);
        totalOnPrem += yearlyOpEx;
    }
    
    // === CLOUD COSTS ===
    
    // Migration Cost
    const migrationCost = count * migration.costPerVM;
    const assessmentCost = 25000; // Initial assessment
    const trainingCost = 15000; // Staff training
    const totalMigrationCost = migrationCost + assessmentCost + trainingCost;
    
    // Compute Costs (with regional modifier)
    const computeHourly = instance.hourly * regionalMod;
    const annualComputeCost = (computeHourly * hoursPerYear) * count;
    
    // Storage Costs (with regional modifier)
    const storageMonthly = storageSize * storage.priceGB * regionalMod;
    const annualStorageCost = storageMonthly * 12;
    
    // Network Costs
    const monthlyEgress = dataTransfer * DATA_TRANSFER_PRICING.egress * regionalMod;
    const annualNetworkCost = monthlyEgress * 12;
    
    // Support & Services (3-5% of annual spend)
    const annualSupportCost = (annualComputeCost + annualStorageCost) * 0.04;
    
    const totalAnnualCloudCost = annualComputeCost + annualStorageCost + 
                                 annualNetworkCost + annualSupportCost;
    
    // Calculate yearly cloud cash flows
    let cloudCashFlow = [];
    let totalCloud = totalMigrationCost;
    
    for (let y = 1; y <= years; y++) {
        // Cloud costs can have slight increases but more predictable
        const cloudInflation = Math.pow(1.01, y); // 1% cloud price drift
        const yearlyCloud = totalAnnualCloudCost * cloudInflation;
        cloudCashFlow.push(yearlyCloud);
        totalCloud += yearlyCloud;
    }
    
    // === FINANCIAL METRICS ===
    
    const savings = totalOnPrem - totalCloud;
    const roi = totalCloud > 0 ? (savings / totalCloud) * 100 : 0;
    
    // Net Present Value calculation
    let npv = -totalMigrationCost;
    for (let i = 0; i < years; i++) {
        const cashDifference = onPremCashFlow[i] - cloudCashFlow[i];
        npv += cashDifference / Math.pow(1 + discountRate, i + 1);
    }
    
    // Payback Period (years)
    let cumulativeCloud = totalMigrationCost;
    let cumulativeOnPrem = totalCapEx;
    let paybackPeriod = years;
    
    for (let i = 0; i < years; i++) {
        cumulativeCloud += cloudCashFlow[i];
        cumulativeOnPrem += onPremCashFlow[i];
        
        if (cumulativeCloud < cumulativeOnPrem && paybackPeriod === years) {
            paybackPeriod = i + 1 + ((cumulativeCloud - (cumulativeOnPrem - onPremCashFlow[i])) / onPremCashFlow[i]);
        }
    }
    
    // Store results for current tab
    const result = {
        totalOnPrem,
        totalCloud,
        savings,
        roi,
        npv,
        migrationCost: totalMigrationCost,
        paybackPeriod,
        onPremCashFlow,
        cloudCashFlow,
        annualComputeCost,
        annualStorageCost,
        annualNetworkCost,
        breakdown: {
            onPrem: {
                capex: totalCapEx,
                power: annualPowerCost,
                cooling: annualCoolingCost,
                space: annualSpaceCost,
                maintenance: annualMaintenance,
                admin: annualAdminCost,
                licenses: annualSoftwareLicenses
            },
            cloud: {
                migration: totalMigrationCost,
                compute: annualComputeCost,
                storage: annualStorageCost,
                network: annualNetworkCost,
                support: annualSupportCost
            }
        }
    };
    
    tabCalculations[currentTab] = result;
    return result;
}

// Save Project
async function saveProject(name, data) {
    if (!name) return alert("Please enter a scenario name");
    
    // Get current user
    const { data: { user } } = await db.auth.getUser();
    
    if (!user) {
        alert("Error: Not logged in");
        return;
    }
    
    const { error } = await db.from('tco_records').insert([{ 
        project_name: name, 
        inputs: data,
        currency: currentCurrency,
        user_id: user.id  // CRITICAL: Set the user_id
    }]);
    
    if (error) {
        alert("Save Error: " + error.message);
        console.error("Save error details:", error);
    } else {
        alert("Scenario saved successfully!");
        loadHistory();
    }
}

// Load History
async function loadHistory() {
    const list = document.getElementById('projectList');
    if (!list) return;
    
    // Get current user
    const { data: { user } } = await db.auth.getUser();
    
    if (!user) {
        console.error("No user logged in");
        return;
    }
    
    // Fetch only current user's records
    const { data, error } = await db.from('tco_records')
        .select('*')
        .eq('user_id', user.id)  // CRITICAL: Filter by user_id
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error("History Error:", error);
        return;
    }
    
    list.innerHTML = '';
    
    if (!data || data.length === 0) {
        list.innerHTML = '<div style="padding: 12px; color: #64748b; font-size: 13px;">No saved scenarios yet</div>';
        return;
    }
    
    data.forEach(p => {
        const div = document.createElement('div');
        div.className = 'history-item';
        const currency = p.currency || 'USD';
        const currSymbol = currency === 'USD' ? '$' : '₹';
        div.innerHTML = `
            <b>${p.project_name}</b><br>
            <small>${new Date(p.created_at).toLocaleDateString()} • ${currSymbol}</small>
        `;
        div.onclick = () => {
            currentCurrency = currency;
            document.getElementById('currency').value = currency;
            loadState(p.inputs);
        };
        list.appendChild(div);
    });
}
