// import externe
import React, { useEffect } from "react";

//store
import { useDispatch } from "react-redux";
import { setEvents } from "../reducers/events";

//import interne
import { adress } from "../adress";

export default function fetchData() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://${adress}/events/events`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const filteredEvents = data.filter(
            (event) => new Date(event.date) >= new Date()
          );
          dispatch(setEvents(filteredEvents));
        }
      });
  }, []);
}
