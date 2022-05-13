import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(private feedbacksRepository: FeedbacksRepository, private mailAdapter: MailAdapter) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required');
        }

        if (!comment) {
            throw new Error('Comment is required');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invlid screenshot format.');
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailAdapter.sendMail({
            body: `<div style="padding: 10px; height: 100%; background-color: #ccc; display: flex; flex: 1; justify-content: center; align-items: center"><div style="font-family: sans-serif; font-size: 16px; color: #111; padding: 16px; background-color: #fff; display: flex; flex-direction: column; justify-content: center; min-height: 400px; border-radius: 10px; -webkit-box-shadow: 2px 0px 17px 6px rgba(0,0,0,0.59); box-shadow: 2px 0px 17px 6px rgba(0,0,0,0.59);"><p><b>Tipo do feedback</b>: ${type}</p><p><b>Comentário:</b> ${comment}</p>${screenshot ? `<img style="width: 900px" src="${screenshot}" />` : ``}</div></div>`,
            subject: 'Novo Feedback',
        });
    }
}
