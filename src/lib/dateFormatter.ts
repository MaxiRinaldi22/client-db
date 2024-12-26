export function formDate(date: string) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (regex.test(date)) {
    return date;
  } else {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }
}
