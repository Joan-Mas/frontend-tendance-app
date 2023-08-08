export default function dateList (list, day) {
    let results = [];
    
    
    const search = day;
    results = list.filter(e => e.date.match(search));
    
    return results;
}
