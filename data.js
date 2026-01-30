// Professional Cloud TCO Data - Real Provider Pricing (Jan 2025)

// Exchange Rate (Update as needed)
const EXCHANGE_RATES = {
    USD: 1,
    INR: 84.50  // Approximate rate Jan 2025
};

// Real AWS Regions with Actual Pricing
const REGIONS = {
    // US Regions
    "us-east-1": { 
        name: "US East (N. Virginia)", 
        provider: "AWS",
        costMod: 1.0, 
        powerCost: 0.12, 
        co2: 0.4,
        region: "us-east-1"
    },
    "us-west-2": { 
        name: "US West (Oregon)", 
        provider: "AWS",
        costMod: 1.02, 
        powerCost: 0.10, 
        co2: 0.3,
        region: "us-west-2"
    },
    
    // Europe Regions
    "eu-central-1": { 
        name: "Europe (Frankfurt)", 
        provider: "AWS",
        costMod: 1.25, 
        powerCost: 0.35, 
        co2: 0.2,
        region: "eu-central-1"
    },
    "eu-west-2": { 
        name: "Europe (London)", 
        provider: "AWS",
        costMod: 1.22, 
        powerCost: 0.32, 
        co2: 0.25,
        region: "eu-west-2"
    },
    
    // Asia Pacific - India Zones
    "ap-south-1": { 
        name: "Asia Pacific (Mumbai)", 
        provider: "AWS",
        costMod: 0.95, 
        powerCost: 0.10, 
        co2: 0.7,
        region: "ap-south-1"
    },
    "ap-south-2": { 
        name: "Asia Pacific (Hyderabad)", 
        provider: "AWS",
        costMod: 0.93, 
        powerCost: 0.09, 
        co2: 0.68,
        region: "ap-south-2"
    },
    
    // Other APAC
    "ap-southeast-1": { 
        name: "Asia Pacific (Singapore)", 
        provider: "AWS",
        costMod: 1.10, 
        powerCost: 0.18, 
        co2: 0.5,
        region: "ap-southeast-1"
    },
    "ap-northeast-1": { 
        name: "Asia Pacific (Tokyo)", 
        provider: "AWS",
        costMod: 1.15, 
        powerCost: 0.25, 
        co2: 0.45,
        region: "ap-northeast-1"
    },
    
    // Azure India Regions
    "azure-central-india": { 
        name: "Azure Central India (Pune)", 
        provider: "Azure",
        costMod: 0.97, 
        powerCost: 0.11, 
        co2: 0.72,
        region: "centralindia"
    },
    "azure-south-india": { 
        name: "Azure South India (Chennai)", 
        provider: "Azure",
        costMod: 0.96, 
        powerCost: 0.10, 
        co2: 0.70,
        region: "southindia"
    },
    
    // GCP India Region
    "gcp-asia-south1": { 
        name: "GCP Asia South 1 (Mumbai)", 
        provider: "GCP",
        costMod: 0.94, 
        powerCost: 0.10, 
        co2: 0.69,
        region: "asia-south1"
    }
};

// Real Instance Types (Based on actual cloud pricing)
const INSTANCE_CATALOG = [
    // General Purpose - AWS t3/m5 equivalent
    { 
        id: "gp_small", 
        name: "2 vCPU, 8 GB RAM (t3.large)", 
        vcpu: 2, 
        ram: 8, 
        hourly: 0.0832,  // AWS t3.large
        hardwareCost: 3500,
        provider: "AWS/Azure/GCP"
    },
    { 
        id: "gp_medium", 
        name: "4 vCPU, 16 GB RAM (m5.xlarge)", 
        vcpu: 4, 
        ram: 16, 
        hourly: 0.192,   // AWS m5.xlarge
        hardwareCost: 6000,
        provider: "AWS/Azure/GCP"
    },
    { 
        id: "gp_large", 
        name: "8 vCPU, 32 GB RAM (m5.2xlarge)", 
        vcpu: 8, 
        ram: 32, 
        hourly: 0.384,   // AWS m5.2xlarge
        hardwareCost: 9000,
        provider: "AWS/Azure/GCP"
    },
    
    // Memory Optimized - r5 equivalent
    { 
        id: "mem_medium", 
        name: "4 vCPU, 32 GB RAM (r5.xlarge)", 
        vcpu: 4, 
        ram: 32, 
        hourly: 0.252,   // AWS r5.xlarge
        hardwareCost: 10000,
        provider: "AWS/Azure/GCP"
    },
    { 
        id: "mem_large", 
        name: "8 vCPU, 64 GB RAM (r5.2xlarge)", 
        vcpu: 8, 
        ram: 64, 
        hourly: 0.504,   // AWS r5.2xlarge
        hardwareCost: 15000,
        provider: "AWS/Azure/GCP"
    },
    
    // Compute Optimized - c5 equivalent
    { 
        id: "cpu_large", 
        name: "16 vCPU, 32 GB RAM (c5.4xlarge)", 
        vcpu: 16, 
        ram: 32, 
        hourly: 0.68,    // AWS c5.4xlarge
        hardwareCost: 12000,
        provider: "AWS/Azure/GCP"
    },
    { 
        id: "cpu_xlarge", 
        name: "32 vCPU, 64 GB RAM (c5.9xlarge)", 
        vcpu: 32, 
        ram: 64, 
        hourly: 1.53,    // AWS c5.9xlarge
        hardwareCost: 20000,
        provider: "AWS/Azure/GCP"
    }
];

// Real Storage Pricing
const STORAGE_TIERS = [
    { 
        id: "ssd", 
        name: "SSD / EBS gp3 (High Performance)", 
        priceGB: 0.08,   // AWS gp3 pricing
        iops: 3000,
        provider: "AWS/Azure/GCP"
    },
    { 
        id: "hdd", 
        name: "HDD / EBS st1 (Throughput Optimized)", 
        priceGB: 0.045,  // AWS st1 pricing
        iops: 500,
        provider: "AWS/Azure/GCP"
    },
    { 
        id: "s3_standard", 
        name: "Object Storage / S3 Standard", 
        priceGB: 0.023,  // AWS S3 Standard
        iops: 0,
        provider: "AWS/Azure/GCP"
    },
    { 
        id: "s3_ia", 
        name: "Infrequent Access / S3-IA", 
        priceGB: 0.0125, // AWS S3-IA
        iops: 0,
        provider: "AWS/Azure/GCP"
    },
    { 
        id: "glacier", 
        name: "Archive / Glacier Flexible", 
        priceGB: 0.0036, // AWS Glacier
        iops: 0,
        provider: "AWS/Azure/GCP"
    }
];

// Migration Strategies
const MIGRATION_COMPLEXITY = [
    { 
        id: "lift", 
        name: "Lift & Shift (Rehost)", 
        costPerVM: 800,
        description: "Direct VM migration with minimal changes"
    },
    { 
        id: "replatform", 
        name: "Replatform (Lift & Optimize)", 
        costPerVM: 2500,
        description: "Minor optimizations for cloud compatibility"
    },
    { 
        id: "refactor", 
        name: "Refactor (Rearchitect)", 
        costPerVM: 6000,
        description: "Significant code changes for cloud-native"
    },
    { 
        id: "rebuild", 
        name: "Rebuild (Full Redesign)", 
        costPerVM: 12000,
        description: "Complete application rebuild"
    }
];

// Network Data Transfer Pricing (per GB)
const DATA_TRANSFER_PRICING = {
    egress: 0.09,     // Internet outbound
    ingress: 0.00,    // Internet inbound (free)
    interRegion: 0.02 // Between regions
};