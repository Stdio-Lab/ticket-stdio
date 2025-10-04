import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { supabase } from "@/utils/supabase";
import type { Session, User } from "@supabase/supabase-js";
import { useRouter, useFocusEffect } from "expo-router";
import { Spinner } from '@/components/ui/spinner/index';
import AsyncStorage from "@react-native-async-storage/async-storage";



type Employee = {
  id: string;
  name: string;
  is_admin: boolean;
  id_organization: string;
  id_user: string;
};

type AuthContextType = {
  session: Session | null;
  user: Session["user"] | null;
  employee: Employee | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [employee, setEmployee] = useState<Employee | null>();
  
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    initAuth();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!loading) {
        if (!session?.user) router.replace("/auth/login");
        // else if (!employee) router.replace("/auth/signin");
      }
    }, [loading, session?.user, employee])
  );


  const initAuth = async () => {

    const isInStorage = await initFromStorage();
    if (isInStorage) return;
    

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      fetchEmployee(session?.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Guardamos los datos si los tenemos
    if (session) await AsyncStorage.setItem("session", JSON.stringify(session));
    if (employee) await AsyncStorage.setItem("employee", JSON.stringify(employee));

    return () => subscription.unsubscribe();
  }

  const initFromStorage = async () => {
    try {
      // Intenta leer del AsyncStorage
      const storedSession = await AsyncStorage.getItem("session");
      const storedEmployee = await AsyncStorage.getItem("employee");

      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
      if (storedEmployee) {
        setEmployee(JSON.parse(storedEmployee));
      }

      // Si ambos existen, no hace falta pedir nada más
      if (storedSession && storedEmployee) {
        setLoading(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error intendando leer los datos de session en Async")
      return false;
    }

  }

  const fetchEmployee = async (user: User | undefined) => {
    if (user) {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id_user", user.id)
        .single();

      if (error) {
        console.error("Error fetching employee data:", error);
        setEmployee(null);
        return;
      }
      setEmployee(data);
    }
  };

  if (loading)
    return (
      <Spinner
        // color="#3B82F6" // azul Gluestack por defecto
        // size={50}       // tamaño del ActivityIndicator
      />
    );

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, employee: employee ?? null, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;