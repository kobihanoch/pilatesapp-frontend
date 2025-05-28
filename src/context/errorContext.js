import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

const errorContext = createContext();

export const ErrorProvider = ({ children }) => {
  // State
  const [error, setErrorState] = useState(null);

  // Functions
  const setError = useCallback((msg, status = null) => {
    setErrorState({ message: msg, status: status });
  }, []);
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Toasting auto when new error comes in
  useEffect(() => {
    if (error) {
      toast.error(`שגיאה ${error.status}: ${error.message}`);
    }
  }, [error]);

  return (
    <errorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </errorContext.Provider>
  );
};

export const useErrorContext = () => {
  const context = useContext(errorContext);
  if (!context) {
    throw new Error("useerrorContext must be used within a errorProvider");
  }
  return context;
};
