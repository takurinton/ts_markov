import text from './text';

const arrangeText = (text: string) => {
    text = text.replace(/\n/g, '。');
    text = text.replace(/[\?\!？！]/g, '。');
    text = text.replace(/[-|｜:：・]/g, '。');
    text = text.replace(/[「」（）\(\)\[\]【】]/g, ' ');
    return text;
};

console.log(arrangeText(text));