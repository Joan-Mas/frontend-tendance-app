export default function ForFilterEventName(data, researchLowerCase) {

    const regexPattern = researchLowerCase.replace(/\s/g, '');
    console.log(regexPattern);
    let newDataBase = []; //!fonction de filtrage
    
     
      for (let i = 0; i < data.length; i++) {
        let CompareData = data[i].eventName.toLowerCase().replace(/\s/g, '');
        if (CompareData.includes(regexPattern)) {
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
      return newDataBase
    
    };
    
      