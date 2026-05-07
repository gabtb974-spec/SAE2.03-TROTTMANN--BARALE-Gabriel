let HOST_URL = "https://trottmann-sae203.mmi-limoges.fr/";

let DataProfile = {};

DataProfile.getAll = async function() {
  const response = await fetch(`${HOST_URL}/server/script.php?todo=readprofiles`);
  const data = await response.json();
  return data;
};

DataProfile.add = async function(formData) {
  const response = await fetch(`${HOST_URL}/server/script.php?todo=addprofile`, {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  return data;
};

DataProfile.update = async function(formData) {
  const response = await fetch(`${HOST_URL}/server/script.php?todo=updateprofile`, {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  return data;
};

export { DataProfile };