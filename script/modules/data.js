export const loadData = async () => {
  const response = await fetch('../../date.json');
  const data = await response.json();
  return data;
};
