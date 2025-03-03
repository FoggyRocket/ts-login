interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterUserData): Promise<void> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success (80% of the time)
      if (Math.random() > 0.2) {
        console.log('User registered:', userData);
        resolve();
      } else {
        reject(new Error('Registration failed'));
      }
    }, 1000);
  });
}; 