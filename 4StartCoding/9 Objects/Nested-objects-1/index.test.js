const fs = require('fs');
let code = fs.readFileSync('./index.js', 'utf8');
eval(code)

// console.log(code)
let addr = person.hasOwnProperty('address');

if(addr){
  let str = (person.address.hasOwnProperty('street'));
  let city = person.address.hasOwnProperty('city');;
  let zip = person.address.hasOwnProperty('zipcode');;
  if(!str || !city || !zip){
      console.log(`\n ❌\t Looks like you haven't added all properties to 'address' yet. Make sure address has a street, city, and zip property with values defined. \n`)
  }else{
     console.log(`\n ✅\t Great job creating the address object!  \n`)
  }
}else{
  console.log(`\n ❌\t Looks like you haven't the address property to 'person' object yet. \n`)
}

  // 