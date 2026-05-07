let HOST_URL = "htps://trottmann-sae203.mmi-limoges.fr";

let DataProfile = {};

DataProfile.read = async function() {
  const response = await fetch(`${HOST_URL}/server/script.php?todo=readprofiles`);
  const data = await response.json();
  return data;
};

export { DataProfile };