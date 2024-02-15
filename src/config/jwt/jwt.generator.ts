import { sign } from "jsonwebtoken";

export const jwtGenerator = (uid: any, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    sign(
      payload,
      process.env.JWT_SEED!,
      {
        expiresIn: "5h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};
