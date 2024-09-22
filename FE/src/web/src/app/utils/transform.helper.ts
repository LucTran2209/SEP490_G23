//convert camelCase to PascalCase
// function camelToPascalCase(str: string): string {
//     return str.toLowerCase()
// }

//Utility function to map API response to frontend model
// export function mapApiResponse(apiResponse: Record<string, any>, flagTypeHttp: boolean = true): Record<string, any> {
//     const result: Record<string, any> = {};
//     for (const [key, value] of Object.entries(apiResponse)) {

//         const pascalCaseKey = camelToPascalCase(key);
//         console.log(pascalCaseKey)
//         if (value && typeof value === 'object' && !Array.isArray(value)) {
//             result[pascalCaseKey] = mapApiResponse(value);
//         }
//         else {
//             result[pascalCaseKey] = value;
//         }

//     }
//     return result;
// }

export function convertToDatetime(data: any) {
    if (data) {
      const date = new Date(data);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      const ss = String(date.getSeconds()).padStart(2, '0');
      data = `${hh}:${min}:${ss} ${dd}-${mm}-${yyyy} `;
    }
    return data;
  }

  export function convertToDate(data: any) {
    if (data) {
      const date = new Date(data);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      data = `${dd}-${mm}-${yyyy}`;
    }
    return data;
  }
