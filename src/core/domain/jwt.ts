import { verify, sign } from "jsonwebtoken";
import { HttpError } from "../errors/http-error";

interface Signature {
  id: string;
  email: string;
}

interface JwtProps {
  authenticatedId: string;
  token: string;
}

type DecodedToken = Signature & { exp: number };

const SECRET_SIGN_IN_KEY = "my-secret-sign-in-key";

export class Jwt {
  readonly authenticatedId: string;
  readonly token: string;

  private constructor({ authenticatedId, token }: JwtProps) {
    this.authenticatedId = authenticatedId;
    this.token = token;
  }

  static signIn(signature: Signature): Jwt {
    const token = sign(
      {
        id: signature.id,
        email: signature.email,
      },
      SECRET_SIGN_IN_KEY,
      {
        expiresIn: "1h",
      }
    );

    return new Jwt({ authenticatedId: signature.id, token });
  }

  static decodeToken(token: string): DecodedToken {
    try {
      const decoded = verify(token, SECRET_SIGN_IN_KEY) as DecodedToken;

      return decoded;
    } catch (error) {
      throw new HttpError("The JWT token is invalid", 401);
    }
  }
}
