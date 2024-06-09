import React from "react";

export default function Profile({ userData }) {
  let { firt_name, last_name, age, email } = userData;

  return (
    <>
      <h4>
        name :{firt_name} {last_name}
      </h4>
      <h4>name :{age}</h4>
      <h4>name :{email}</h4>
    </>
  );
}
