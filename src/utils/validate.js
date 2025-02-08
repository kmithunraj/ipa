exports.validateName = (name) => {
  if (!name?.trim()) {
    throw new Error('Name is required');
  }
  if (!/^[a-zA-Z\s]{2,100}$/.test(name.trim())) {
    throw new Error('Name must be 2-100 characters long and contain only letters and spaces');
  }
  return name.trim();
};

exports.validateDate = (date) => {
  if (!date) {
    throw new Error('Date is required');
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format');
  }
  if (parsedDate > new Date()) {
    throw new Error('Date cannot be in the future');
  }
  return parsedDate;
};

exports.validateStudentId = (id) => {
  if (!id?.trim()) {
    throw new Error('Student ID is required');
  }
  if (!/^\d{4}[A-Z]{4}$/.test(id.trim())) {
    throw new Error('Invalid student ID format');
  }
  return id.trim();
}; 