import React, { useState, useEffect } from "react";
import "./App.css";
import { useFirebase } from "./firebase/FirebaseContext";

function App() {
  //Firebase connection testing
  const [listings, setListings] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    //* get function for listings
    firebase.listings().once("value", (snapshot) => {
      const dbReponse = snapshot.val();
      setListings(formatData(dbReponse));
    });
  }, []);

  const formatData = (dataObj) => {
    let formattedArr = [];
    for (let listing in dataObj) {
      const val = dataObj[listing];
      val["listing"] = listing;
      formattedArr.push(val);
    }
    return formattedArr;
  };

  const saveListing = (e) => {
    //* This is the post function for listings to firebase db. this needs to be refactored,
    e.preventDefault();

    let listingData = {
      title: "test listing 2",
      business_name: "other business",
      description: "desc2",
      location: "LA",
      platform: "gofundme",
      isQualified: false,
    };

    firebase.listings().push(listingData, () => {
      console.log("Listing Saved");
    });
  };

  console.log(listings)

  return (
    <div className="App">
      {listings.map((listing, index) => {
        return (
          <div key={`listing key ${index}`}>
            <p>{listing.title}</p>
            <p>{listing.business_name}</p>
            <p>{listing.location}</p>
            <p>{listing.platform}</p>
          </div>
        );
      })}
      <button onClick={saveListing}>save2</button>
    </div>
  );
}

export default App;
