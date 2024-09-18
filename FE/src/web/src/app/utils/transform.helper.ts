//convert camelCase to PascalCase
function camelToPascalCase(str: string): string {
    return str.toLowerCase()
}

//Utility function to map API response to frontend model
export function mapApiResponse(apiResponse: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(apiResponse)) {

        const pascalCaseKey = camelToPascalCase(key);
        console.log(pascalCaseKey)
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            result[pascalCaseKey] = mapApiResponse(value);
        }
        else {
            result[pascalCaseKey] = value;
        }

    }
    return result;
}
