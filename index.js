// index.js
import { userRouter } from 'file:///C:/UMC-Node.js/test3/src/routes/user.route.js';
import { specs } from 'file:///C:/UMC-Node.js/test3/config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();    // .env ���� ��� (ȯ�� ���� ����)

const app = express();

// server setting - veiw, static, body-parser etc..
app.set('port', process.env.PORT || 3000)   // ���� ��Ʈ ����
app.use(cors());                            // cors ��� ���
app.use(express.static('public'));          // ���� ���� ����
app.use(express.json());                    // request�� ������ json���� �ؼ��� �� �ֵ��� �� (JSON ������ ��û body�� �Ľ��ϱ� ����)
app.use(express.urlencoded({extended: false})); // �ܼ� ��ü ���ڿ� ���·� ���� ������ �ؼ�


//swagger settings
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.use('/user', userRouter);

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});