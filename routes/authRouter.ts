import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const clientId = process.env.YANDEX_CLIENT_ID!;
const clientSecret = process.env.YANDEX_CLIENT_SECRET!;
const jwtSecret = process.env.JWT_SECRET!;

router.post('/yandex', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({error: 'Нет кода авторизации' });
  }

  try {
    const tokenResponse = await axios.post(
      'https://oauth.yandex.ru/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}
    );

    const accessToken = tokenResponse.data.access_token;

    const userInfoResponse = await axios.get('https://login.yandex.ru/info', {
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });

    const yandexId = userInfoResponse.data.id;
    const email = userInfoResponse.data.default_email;

    let user = await prisma.user.findUnique({ where: { yandexId } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          yandexId,
          email,
        },
      });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: '7d',
    });

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка авторизации' });
  }
});

export default router;