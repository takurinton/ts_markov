import text from './text';
const TinySegmenter = require('tiny-segmenter');

const segmenter = new TinySegmenter();  // インスタンスを作成
// const segmenter = require('tiny-segmenter'); だと any になってしまうのでクラスを呼んでインスタンスを作成してその中の関数を使用する必要がある

interface Morpheme {
    [key: string]: string[];
};

const START = '__START__';
const END   = '__END__';

const arrangeText = (text: string): string => {
    text = text.replace(/\n/g, '。');
    text = text.replace(/[\?\!？！]/g, '。');
    text = text.replace(/[-|｜:：・]/g, '。');
    text = text.replace(/[「」（）\(\)\[\]【】]/g, ' ');
    return text;
};

const makeDict = (text: string): Morpheme => {
    const sentences = text.split('。');
    const morpheme: Morpheme = {};
    for(var i = 0; i < sentences.length; i++) {
        let tokenized: string[] = segmenter.segment(sentences[i]) // ここでわかち書きを行っている
        if (!morpheme[START]) morpheme[START] = [];
        if (tokenized[0]) morpheme[START].push(tokenized[0]); // 文の先頭の判断
        for (var w = 0; w < tokenized.length; w++) {
            const now: string = tokenized[w];
            const next: string = tokenized[w+1] ?? END; 
            // ここではSTART判断と同じことをしてる
            // 今のワードに紐づく次のワードを突っ込んでる
            if (!morpheme[now]) morpheme[now] = [];
            morpheme[now].push(next);

            if (now === '、') morpheme[START].push(next); // 、はstartの要素として使えるっぽい
        };
    };
    return morpheme;
};

const makeSentence = (dict: Morpheme): string => {
    let now: string = '';
    let result: string = '';
    now = dict[START][Math.floor(Math.random() * dict[START].length)]; // いい感じにしてる(ぇ
    result += now;
    while (now !== END) {
        now = dict[now][Math.floor(Math.random() * dict[now].length)];
        result += now;
    };
    result = result.replace(END, '。')
    return result;
};

const main = () => {
    const _text: string = arrangeText(text);
    const dict: Morpheme = makeDict(_text);
    const sentence: string = makeSentence(dict);
    console.log(sentence);
};

for (var i = 0; i < 5; i++) {
    main();
};