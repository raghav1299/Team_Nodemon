// var axios = require("axios").default;

// var options = {
//   method: "GET",
//   url: "https://distance-calculator1.p.rapidapi.com/v1/getdistance",
//   params: {
//     start_lat: "13.198989944266078",
//     start_lng: "77.70908188996312",
//     end_lat: "13.113908410795627",
//     end_lng: "77.5745906650984",
//     unit: "kilometers",
//   },
//   headers: {
//     "x-rapidapi-host": "distance-calculator1.p.rapidapi.com",
//     "x-rapidapi-key": "1446952fcdmsh4d730342fde0d6dp1f1453jsn49f9f83affe6",
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

// //send_notification_to_shop
// var data = JSON.stringify({
//   to: "dF2UQ3AsRcGapMtVy3BiiL:APA91bF7EyV7LER_h1RRhlWuBNze2kuHhhMvrJuEqWvVuPO5uccKqLIditGyZ1EmSaOcTSg9vhgtFGLeXhQYtv0QG06MeVg-oDPeaqBsn_IIIpXn81DGFTL52zESP_R7m75NvvL70gEM",
//   collapse_key: "type_a",
//   notification: {
//     body: "Samaan leke aa",
//     title: "https://meet.google.com/sju-ajvo-bdn",
//   },
// });

// var config = {
//   method: "post",
//   url: "https://fcm.googleapis.com/fcm/send",
//   headers: {
//     Authorization:
//       "Bearer AAAAIS5xTrk:APA91bGhfh3dr689qPK2PGQZ3BGleALPsbaJcze24ftu4p9M21RU_XTBL6GgWGza5sEl2vEYq8DQgg28gDvX0jUb209xt20HZ_nFUiOViIk3SepGErKJJ0fZ3g-G1uABGfNQ-w0R5do8",
//     "Content-Type": "application/json",
//   },
//   data: data,
// };

// var x = 10

// function initial(){
//    console.log(x);
//    var x = 20;
//    console.log(x);
// }

// initial()

// const {nanoid} = require('nanoid')
// console.log(nanoid());