export default function formatDateToFrenchLocale(dateStr) {
    const monthsInFrench = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
  
    const daysInFrench = [
      "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
    ];
  
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();
  
    const formattedDate = `${daysInFrench[dayOfWeek]} ${String(day).padStart(2, "0")} ${monthsInFrench[month]} ${year}`;
  
    return formattedDate;
  }
  
  const originalDate = "2023-08-01";
  const formattedDate = formatDateToFrenchLocale(originalDate);
