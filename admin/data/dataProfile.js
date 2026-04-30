let HOST_URL = "..";

let DataProfile = {};

DataProfile.add = async function(formData) {
  const response = await fetch(`${HOST_URL}/server/script.php?todo=addprofile`, {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  return data;
};

export { DataProfile };