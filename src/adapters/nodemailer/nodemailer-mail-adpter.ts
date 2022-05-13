import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '3302454c8e70f3',
        pass: 'af2df363c18e64',
    },
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Lucas Kaiut <lucas.kaiut@gmail.com>',
            subject,
            html: body,
        });
    }
}
