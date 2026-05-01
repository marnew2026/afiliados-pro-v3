export default function Dashboard({ user }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user?.email}</p>

      <div style={{ marginTop: 20 }}>
        <p>Seu painel de afiliado está ativo.</p>
      </div>
    </div>
  );
}