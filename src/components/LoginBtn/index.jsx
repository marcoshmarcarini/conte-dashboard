import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router"; // Importe o useRouter

export default function LoginBtn() {
  const { data: session } = useSession();
  const router = useRouter(); // Instancie o useRouter

  const username = session?.user?.name;

  if (session.user.email) {
    return (
      <>
        <div className={`flex items-center gap-3`}>
          <p className={`text-slate-500 text-sm`}>
            Olá, {username}
          </p>
          <button
            className={`border border-orange-500 rounded-sm p-2 text-white bg-orange-400 hover:bg-white hover:text-orange-400 hover:border-orange-400 transition transform`}
            onClick={() => {
              signOut();
              router.push("/"); // Use o roteador para redirecionar
            }}
          >
            Encerrar
          </button>
        </div>
      </>
    );
  } else {
    // Redirecionamento condicional no lado do cliente
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }
}