export default function formateDate(date: any) {
    const newDate = (`${JSON.stringify(date.getDate()).padStart(2, '0')}/${JSON.stringify(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`)
    return newDate;
}