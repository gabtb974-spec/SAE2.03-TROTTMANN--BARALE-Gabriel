let HOST_URL = "";

let DataProfile = {};

DataProfile.read = async function() {
  const response = await fetch(`${HOST_URL}server/script.php?todo=readprofiles`);
  const data = await response.json();
  return data;
};

export { DataProfile };