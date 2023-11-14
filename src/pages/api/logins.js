import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Obtén el usuario de la base de datos
  const user = await getUserFromDatabase(req.body.username);

  // Verifica si el usuario existe y si la contraseña es correcta
  if (!user || !verifyPassword(req.body.password, user.password)) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  // Genera el JWT utilizando el ID del usuario como payload
  const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });

  // Devuelve el JWT al cliente
  res.status(200).json({ token });
}