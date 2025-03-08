#!/usr/bin/env node

/**
 * Feature Generator Script
 *
 * This script creates a new feature with common files and boilerplate code.
 * Usage: node scripts/create-feature.js my-feature
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper to ask questions
function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Convert string to PascalCase
function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

// Convert string to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

// Create directory if it doesn't exist
function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
}

// Create file with content
function createFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created file: ${filePath}`);
  } else {
    console.log(`⚠️ File already exists: ${filePath}`);
  }
}

// Template for a client component
function clientComponentTemplate(featureName, componentName) {
  return `"use client";

import { useState } from "react";

export default function ${componentName}() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="rounded-xl p-6 shadow-lg" style={{
      backgroundColor: "var(--cardBackground)",
      borderColor: "var(--border)",
      borderWidth: "1px",
      borderStyle: "solid",
    }}>
      <h2 className="mb-4 text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
        ${featureName}
      </h2>
      <p style={{ color: "var(--foreground)" }}>
        Your ${featureName} component content here.
      </p>
    </div>
  );
}
`;
}

// Template for a server component
function serverComponentTemplate(featureName, componentName) {
  return `import { getAuthSession } from "@/lib/session";

export default async function ${componentName}() {
  // Get authenticated session
  const session = await getAuthSession();
  
  return (
    <div className="rounded-xl p-6 shadow-lg" style={{
      backgroundColor: "var(--cardBackground)",
      borderColor: "var(--border)",
      borderWidth: "1px",
      borderStyle: "solid",
    }}>
      <h2 className="mb-4 text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
        ${featureName}
      </h2>
      <p style={{ color: "var(--foreground)" }}>
        Hello, {session.user.name || session.user.email}
      </p>
    </div>
  );
}
`;
}

// Template for API routes
function apiRouteTemplate(featureName) {
  return `import { getSession } from "@/lib/session";
import { handleRouteError, ValidationError, AuthError } from "@/lib/error";

/**
 * GET /api/${toKebabCase(featureName)}
 */
export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    
    // Get session for authenticated routes
    const session = await getSession();
    
    // Check authentication if required
    if (!session) {
      throw new AuthError('Authentication required');
    }
    
    // Success response
    return Response.json({
      message: '${featureName} API is working!',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

/**
 * POST /api/${toKebabCase(featureName)}
 */
export async function POST(request: Request) {
  try {
    // Parse JSON body
    const body = await request.json().catch(() => {
      throw new ValidationError('Invalid JSON body');
    });
    
    // Process the request
    const data = {
      success: true,
      message: \`Processed ${featureName} request\`,
    };
    
    return Response.json(data, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
`;
}

// Template for a types file
function typesTemplate(featureName) {
  const pascalName = toPascalCase(featureName);
  return `/**
 * Types for ${featureName} feature
 */

export interface ${pascalName} {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ${pascalName}CreateInput {
  name: string;
}

export interface ${pascalName}UpdateInput {
  id: string;
  name?: string;
}
`;
}

// Template for a utils file
function utilsTemplate(featureName) {
  const kebabName = toKebabCase(featureName);
  return `/**
 * Utility functions for ${featureName} feature
 */

export async function fetch${toPascalCase(featureName)}() {
  const response = await fetch(\`/api/${kebabName}\`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch ${featureName}');
  }
  
  return response.json();
}

export async function create${toPascalCase(featureName)}(data: any) {
  const response = await fetch(\`/api/${kebabName}\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to create ${featureName}');
  }
  
  return response.json();
}
`;
}

async function main() {
  try {
    // Get feature name from command line
    const args = process.argv.slice(2);
    let featureName = args[0];

    // If no feature name provided, ask for it
    if (!featureName) {
      featureName = await question("Enter feature name (e.g., user-profile): ");
      if (!featureName) {
        console.error("❌ Feature name is required");
        process.exit(1);
      }
    }

    // Clean feature name and create variations
    featureName = toKebabCase(featureName);
    const pascalFeatureName = toPascalCase(featureName);

    // Ask for component type
    const componentType = await question(
      "Create component as (server/client) [default: client]: "
    );
    const isServerComponent = componentType.toLowerCase() === "server";

    // Ask if API route should be created
    const createApi = await question("Create API route? (y/n) [default: y]: ");
    const shouldCreateApi = createApi.toLowerCase() !== "n";

    // Ask if types file should be created
    const createTypes = await question(
      "Create types file? (y/n) [default: y]: "
    );
    const shouldCreateTypes = createTypes.toLowerCase() !== "n";

    // Ask if utils file should be created
    const createUtils = await question(
      "Create utils file? (y/n) [default: y]: "
    );
    const shouldCreateUtils = createUtils.toLowerCase() !== "n";

    // Set up directories
    const componentsDir = path.join(
      process.cwd(),
      "src",
      "components",
      featureName
    );
    const apiDir = path.join(process.cwd(), "src", "app", "api", featureName);
    const typesDir = path.join(process.cwd(), "src", "types");
    const libDir = path.join(process.cwd(), "src", "lib");

    // Create component
    createDir(componentsDir);
    const componentFilename = path.join(
      componentsDir,
      `${pascalFeatureName}.tsx`
    );
    const componentTemplate = isServerComponent
      ? serverComponentTemplate(pascalFeatureName, pascalFeatureName)
      : clientComponentTemplate(pascalFeatureName, pascalFeatureName);
    createFile(componentFilename, componentTemplate);

    // Create index file for easier imports
    const indexFilename = path.join(componentsDir, "index.ts");
    createFile(
      indexFilename,
      `export { default as ${pascalFeatureName} } from './${pascalFeatureName}';\n`
    );

    // Create API route
    if (shouldCreateApi) {
      createDir(apiDir);
      const apiFilename = path.join(apiDir, "route.ts");
      createFile(apiFilename, apiRouteTemplate(pascalFeatureName));
    }

    // Create types
    if (shouldCreateTypes) {
      createDir(typesDir);
      const typesFilename = path.join(typesDir, `${featureName}.ts`);
      createFile(typesFilename, typesTemplate(pascalFeatureName));
    }

    // Create utils
    if (shouldCreateUtils) {
      createDir(libDir);
      const utilsFilename = path.join(libDir, `${featureName}.ts`);
      createFile(utilsFilename, utilsTemplate(pascalFeatureName));
    }

    console.log("");
    console.log(`🎉 ${pascalFeatureName} feature created successfully!`);
    console.log("");
    console.log("Import component in your page:");
    console.log(
      `import { ${pascalFeatureName} } from '@/components/${featureName}';`
    );

    if (shouldCreateUtils) {
      console.log("");
      console.log("Use utility functions:");
      console.log(
        `import { fetch${pascalFeatureName}, create${pascalFeatureName} } from '@/lib/${featureName}';`
      );
    }
  } catch (error) {
    console.error("❌ Error creating feature:", error);
  } finally {
    rl.close();
  }
}

main();
