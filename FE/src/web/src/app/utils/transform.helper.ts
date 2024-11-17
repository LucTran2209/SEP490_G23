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
