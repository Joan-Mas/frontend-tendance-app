export default function ForFilterDate(data, timeToFilter) {

//console.log('Start');
//console.log(timeToFilter);
//console.log(data);

    let newDataBase = []; //!fonction de filtrage
    
     
      for (let i = 0; i < data.length; i++) {
        let CompareData = data[i].date.slice(0,10);
        let DateSliced = timeToFilter.toString().slice(0,10);
        //console.log(CompareData);
        //console.log(DateSliced);
        //console.log("Actif")
        if (CompareData === DateSliced) {
          const newObject = {
            creatorName: data[i].creatorName,
            _id: data[i]._id,
            address: data[i].address,
            date: data[i].date,
            
            eventCover: data[i].eventCover,
            eventName: data[i].eventName,
            hourEnd: data[i].hourEnd,
            hourStart: data[i].hourStart,
            latitude: data[i].latitude,
            longitude: data[i].longitude,
            price: data[i].price,
            type: data[i].type,
            users: {
              interUsers: data[i].users.interUsers,
              partUsers: data[i].users.partUsers,
            },
          };
          newDataBase.push(newObject);
        }
        
      }
      // console.log(newDataBase);
      return newDataBase
    
    };
    
      