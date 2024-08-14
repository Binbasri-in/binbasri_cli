const app = document.querySelector("#content");
const delay = ms => new Promise(res => setTimeout(res, ms));

function moveCaret(input) {
    const caret = input.nextElementSibling;
    const currTxt = document.createElement('canvas').getContext('2d');
    currTxt.font = getComputedStyle(input).font;

    const text = input.value;
    const textWidth = currTxt.measureText(text).width;

    caret.style.marginLeft = `${textWidth + 10}px`;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) >> 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

let sessionUUID = sessionStorage.getItem('sessionUUID');

if (!sessionUUID) {
    sessionUUID = generateUUID();
    sessionStorage.setItem('sessionUUID', sessionUUID);
}


function smallScreen() {
    return window.innerWidth < 768;
}

document.addEventListener("keydown", async function (event) {
    // Prevent default scrolling behavior for arrow keys
    if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
    }

    const input = document.querySelector("input.input-field");
    if (event.key === "Enter") {
        event.preventDefault();
        await delay(150);
        const value = document.querySelector("input").value;
        if (value === "snake") {
            getInputValue();
            removeInput();
        }
        getInputValue();
        removeInput();
        await delay(150);
        new_line();
    } else {
        updateCursor(input);
    }
});

document.addEventListener("click", function (event) {
    event.preventDefault();
    const input = document.querySelector("input");
    input.focus();
});

async function openTerminal() {

    if (smallScreen()) {
        createSmallText("Use desktop for better experience.");
        return;
    }

    await delay(300);
    createText(`Welcome ${sessionUUID} v2003.10.26`);
    await delay(700);
    createText("Starting the server...");
    await delay(1500);
    createText("<br>");
    createText("Try the following commands.");
    createText("----------------------------");
    createCode("help", "See all commands.");
    createCode("open linkedin", "Opens my LinkedIn account!");
    await delay(500);
    new_line();
}

function new_line() {

    const container = document.createElement("div");
    container.style.display = "flex";

    const p = document.createElement("p");
    p.textContent = "user@Binbasri-in>";

    const inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.setAttribute("class", "input-container");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("id", "input-box");
    input.setAttribute("class", "input-field");
    input.setAttribute("oninput", "moveCaret(this)");

    const caret = document.createElement("span");
    caret.setAttribute("class", "caret");
    caret.setAttribute("id", "caret");

    inputContainer.appendChild(input);
    inputContainer.appendChild(caret);

    container.appendChild(p);
    container.appendChild(inputContainer);

    app.appendChild(container);
    input.focus();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function removeInput() {
    const container = document.querySelector(".input-container").parentNode;
    container.parentNode.removeChild(container);

}

async function getInputValue() {
    const value = document.querySelector("input").value;
    if (value === "help") {
        trueValue(value);
        createCode("about", "About me.");
        createCode("interests", "Stuff that gets me excited!")
        createCode("resume", "Check out my resume.");
        createCode("socials", "All my social networks.");
        createCode("open &lt;social&gt;", "Opens my social media account. Follow me there!")
        createCode("ask &lt;your-question&gt;", "If you want to know specific thing about me, ask me here! (e.g: ask who are you?)");
        createCode("snake", "Play the snake game.");
        createCode("clear", "Clean the terminal.");
    }

    else if (value === "interests") {
        trueValue(value);
        createText("1.  Data Science and getting my hands dirty with data.");
        createText("2.  Web Applications Development.");
        createText("3.  Complex Stuff that people find hard to understand.");
        createText("4.  Knowledge Seeking.");

    }

    else if (value === "resume") {
        trueValue(value);
        createText("Opening resume...");
        window.open('assets/Mohammed-Ali-Alsakkaf.pdf', '_blank');
        createText("Request Complete.")
    }

    else if (value === "snake") {
        trueValue(value);
        createCanvasForSnakeGame();
    }

    else if (value === "about") {
        trueValue(value);
        createText("Hi, I am Mohammed Ali Mohammed Alsakkaf! Call me Ali :)");
    }

    else if (value === "socials") {
        trueValue(value);
        createText("1.  github.com/Binbasri-in");
        createText("2.  linkedin.com/in/mohammed-ali-alsakkaf");
        createText("3.  instagram.com/md.ali.alsakkaf");

    }

    else if (value === "social") {
        trueValue(value);
        createText("Didn't you mean: socials?");
    }

    else if (value === "open github") {
        trueValue(value);
        createText("Opening Github...")
        createText("Request Complete.")
        await delay(300);
        handleSocialSelection('1');
    }

    else if (value === "open linkedin") {
        trueValue(value);
        createText("Opening LinkedIn...")
        createText("Request Complete.")
        await delay(300);
        handleSocialSelection('2');
    }

    else if (value === "open instagram") {
        trueValue(value);
        createText("Opening Instagram...")
        createText("Request Complete.")
        await delay(300);
        handleSocialSelection('3');
    }

    else if (value === "clear") {
        document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
        document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
    }

    else if (value.startsWith("ask")) {
        const question = value.split("ask")[1].trim();
        trueValue(value);
        createText(`You asked: ${question}`);
        await delay(100);
        createMultiLineText(answerQuestion(question));
    }

    else {
        falseValue(value);
        createText(`Command not found: ${value}`);
        createText("Try 'help' to list all commands.")
    }
}

function handleSocialSelection(selection) {
    switch (selection) {
        case '1':
            window.open("https://github.com/Binbasri-in", "_blank");
            break;
        case '2':
            window.open("https://www.linkedin.com/in/mohammed-ali-alsakkaf/", "_blank");
            break;
        case '3':
            window.open("https://instagram.com/md.ali.alsakkaf", "_blank");
            break;
        default:
            createText("Invalid selection.");
    }
}

function trueValue(value) {
    const div = document.createElement("p");
    div.style.display = "flex";
    const mensagem = document.createElement("p");
    mensagem.setAttribute("class", "success");
    mensagem.textContent = `> ${value}`;
    div.appendChild(mensagem);
    app.appendChild(div);
}

function falseValue(value) {
    const div = document.createElement("section");
    div.style.display = "flex";
    const mensagem = document.createElement("p");
    mensagem.setAttribute("class", "error");
    mensagem.textContent = `> ${value}`;
    div.appendChild(mensagem);
    app.appendChild(div);
}

function createText(text) {
    const p = document.createElement("p");
    p.innerHTML = text.replace(/\n/g, '<br>'); 
    app.appendChild(p);
}

function createMultiLineText(text) {
    // Split the text into words
    const words = text.split(/\s+/);
    
    // Group words into chunks of 10
    for (let i = 0; i < words.length; i += 10) {
        const chunk = words.slice(i, i + 10).join(' ');
        createText(chunk);
    }
}

function createSmallText(text) {
    const smallP = document.createElement("p");
    smallP.setAttribute("class", "typeSmall");
    smallP.innerHTML = text;
    app.appendChild(smallP);
}

function createCode(code, text) {
    const p = document.createElement("p");
    p.setAttribute("class", "code");
    p.innerHTML = `${code} :<span class='text'> ${text} </span>`;
    app.appendChild(p);
}

function createCanvasForSnakeGame() {
    const existingCanvas = document.getElementById("snakeGameCanvas");

    if (existingCanvas) {
        existingCanvas.remove();
    }

    const instructionText = document.createElement("p");
    instructionText.setAttribute("id", "startMessage");
    instructionText.style.color = "greenyellow";
    instructionText.style.fontFamily = "VT323";
    instructionText.style.fontSize = "30px";
    instructionText.textContent = "Press any arrow key to start the game.";
    app.appendChild(instructionText);

    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "snakeGameCanvas");
    canvas.setAttribute("width", "500");
    canvas.setAttribute("height", "500");
    app.appendChild(canvas);

    const scoreElement = document.createElement("p");
    scoreElement.setAttribute("id", "snakeScore");
    scoreElement.style.color = "greenyellow";
    scoreElement.style.fontFamily = "VT323";
    scoreElement.style.fontSize = "30px";
    scoreElement.textContent = "Score: 0";
    app.appendChild(scoreElement);

    const gameOverElement = document.createElement("p");
    gameOverElement.setAttribute("id", "gameOverMessage");
    gameOverElement.style.color = "greenyellow";
    gameOverElement.style.fontFamily = "VT323";
    gameOverElement.style.fontSize = "30px";
    app.appendChild(gameOverElement);

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    startSnakeGame(scoreElement, gameOverElement);
    resetEnterPressedFlag();
}

function resetEnterPressedFlag() {
    enterPressed = false;
}

function startSnakeGame(scoreElement, gameOverElement) {
    const canvas = document.getElementById("snakeGameCanvas");
    const context = canvas.getContext("2d");

    const blockSize = 25;
    const rows = 19;
    const cols = 20;
    let snakeX = blockSize * 5;
    let snakeY = blockSize * 5;
    let velocityX = 0;
    let velocityY = 0;
    let snakeBody = [];
    let foodX;
    let foodY;
    let score = 0;
    let gameOver = false;
    let gameOverProcessed = false;

    placeFood();
    document.addEventListener("keyup", changeDirection);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            enterPressed = true;
        }
    });

    setInterval(update, 1000 / 10);

    function update() {
        if (gameOver) {
            if (!gameOverProcessed) {
                gameOverProcessed = true;
                const instructionText = document.getElementById("startMessage");
                if (instructionText) {
                    instructionText.remove();
                }
                canvas.style.display = 'none';
                gameOverElement.textContent = "Game Over!";
                new_line();
            }
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawAsciiBorder();

        context.shadowColor = "rgb(150, 167, 124)";
        context.shadowBlur = 5;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;

        context.fillStyle = "greenyellow";
        context.fillRect(foodX, foodY, blockSize, blockSize);

        if (snakeX == foodX && snakeY == foodY) {
            snakeBody.push([foodX, foodY]);
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
            placeFood();
        }

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }
        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
        }

        context.shadowColor = "rgb(150, 167, 124)";
        context.shadowBlur = 5;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;

        context.fillStyle = "greenyellow";
        snakeX += velocityX * blockSize;
        snakeY += velocityY * blockSize;
        context.fillRect(snakeX, snakeY, blockSize, blockSize);
        for (let i = 0; i < snakeBody.length; i++) {
            context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        }

        if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize || enterPressed) {
            gameOver = true;
            gameOverElement.textContent = "Game Over!";
            canvas.style.display = 'none';
        }

        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                gameOver = true;
                gameOverElement.textContent = "Game Over!";
                canvas.style.display = 'none';
            }
        }
    }

    function drawAsciiBorder() {
        const borderOffset = 9;
        const fontSize = 25;
        context.font = `${fontSize}px VT323`;
        context.fillStyle = "greenyellow";
        context.textAlign = "center";
        const colss = 20;
        const rowss = 20;

        for (let col = 0; col < colss; col++) {
            context.fillText('-', (col + 0.5) * blockSize, borderOffset);
        }

        for (let col = 0; col < colss; col++) {
            context.fillText('-', (col + 0.5) * blockSize, canvas.height - borderOffset);
        }

        for (let row = 0; row < rowss; row++) {
            context.fillText('|', borderOffset, (row + 0.5) * blockSize);
        }

        for (let row = 0; row < rowss; row++) {
            context.fillText('|', canvas.width - borderOffset, (row + 0.5) * blockSize);
        }

        context.fillText('+', borderOffset, borderOffset);
        context.fillText('+', canvas.width - borderOffset, borderOffset);
        context.fillText('+', (borderOffset - 7), canvas.height - (borderOffset - 7));
        context.fillText('+', canvas.width - (borderOffset - 7), canvas.height - (borderOffset - 7));
    }

    function changeDirection(e) {
        if (e.code == "ArrowUp" && velocityY != 1) {
            velocityX = 0;
            velocityY = -1;
        } else if (e.code == "ArrowDown" && velocityY != -1) {
            velocityX = 0;
            velocityY = 1;
        } else if (e.code == "ArrowLeft" && velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
        } else if (e.code == "ArrowRight" && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
        }
    }

    function placeFood() {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }
}

function resetEnterPressedFlag() {
    enterPressed = false;
}

openTerminal();

// Code for Q&A functionality
function answerQuestion(question) {
    console.log('Answering question:', question);
    // use Gemini API to answer the question
    const API_KEY = "AIzaSyCC8t0mV9X1FJt3bhJvEb_OqXTB-DfJ-ZM";

    // Data to be sent in the body of the POST request
    const postData = {
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: "Question: " + question
                    }
                ]
            }
        ],
        systemInstruction: {
            role: "user",
            parts: [
                {
                    text: `You are an AI Assistant tasked with generating concise answer to the provided question using the provided context. You should answer 
                    like you are speaking in my place and you represent my profile. 
                    Here is the context:
                    Profile of Mohammed Ali Al Sakkaf Mohammed Ali Al Sakkaf is a committed and proficient software developer currently freelancing 
                    through Upwork, where he specializes in developing and deploying machine learning models and data science workflows. He harnesses 
                    the power of Flask and Django for web development, assisting in academic research and implementing software solutions from research papers. 
                    His expertise spans Python programming, with significant projects in data science, natural language processing (NLP), deep learning, 
                    TensorFlow, and web development. Education Mohammed Ali Al Sakkaf pursued his Bachelor of Engineering in Computer Science and Engineering 
                    at the BMS Institute of Technology and Management in Bengaluru, from 2021 to 2025, where he achieved a CGPA of 8.85/10.0. 
                    His academic prowess was already evident during his secondary education at Seiyun Model Secondary School, where he graduated with 
                    an impressive 98.0%. Work Experience and Positions From October 2022 to February 2023, Mohammed served as a Data Science Intern at 
                    Technocolabs Softwares. His role involved applying credit risk analysis to P2P lending systems, utilizing exploratory data analysis (EDA), 
                    and feature engineering techniques to derive insights that enhance loan status predictions. He also created a pipeline for production and 
                    deployed models using Flask to integrate these insights into practical applications. Technical Skills Mohammed is proficient in several 
                    programming languages including Python, C, and Java, and he is also skilled in web development using HTML, CSS, JavaScript, React Native, 
                    and Bootstrap. His expertise in data science and machine learning is backed by his use of libraries such as Pandas, NumPy, Scikit-learn, 
                    and TensorFlow. He is familiar with various databases including PostgreSQL, MongoDB, and MySQL, and utilizes tools and platforms like GitHub,
                    Heroku, Twilio API, ROS, OpenCV, Postman, and Databricks. Achievements Mohammed has distinguished himself in the competitive field of 
                    technology through several hackathons and competitions. Notably, he won the first prize at the 48-Hour National Level NITK Surathkal 
                    Hackathon in December 2023, secured a Domain Prize at the 36-Hour National Level Reva Hackathon in November 2023, and participated in a 
                    24-Hour National Level Cyber Security Hackathon in July 2023. Projects His projects include developing a DNA profiling service that uses 
                    STR analysis for forensic identification, a Cyber-Buddy vulnerabilities checker and awareness platform, and Pinnacle Performs, 
                    an AI-enabled document management system. He also developed a cold calling agent application using Flask, integrating Twilio’s API and 
                    OpenAI’s language models to automate and personalize cold calling tasks. His work in analyzing credit risk on European P2P lending 
                    platforms and his contributions to TensorFlow C++ installation tutorials underscore his diverse technical capabilities and his commitment 
                    to sharing knowledge. Volunteering and Leadership As Vice Chair of the IEEE Computer Society Chapter at the BMSIT IEEE Student Branch since
                    January 2023, Mohammed has led several tech events and competitions, significantly enhancing student engagement and skill development. 
                    His volunteer work with the SAKSHAM Program through the Rotaract Club of BMS Yelahanka involved teaching local school students basic 
                    computer operations, enhancing their computer literacy and Microsoft Office skills. MOOCs Mohammed has completed multiple online non-credit 
                    specializations and professional certificates, including the Introductory C Specialization, Excel/VBA for Creative Problem Solving, 
                    Google IT Support Professional Certificate, IBM Data Analyst Professional Certificate, IBM Data Science Professional Certificate, 
                    Introduction to Data Science Specialization, and Python for Everybody Specialization. These certifications demonstrate his continuous 
                    pursuit of knowledge and skill enhancement in his field. Mohammed Ali Al Sakkaf’s profile reflects a dedicated professional with a robust 
                    educational background, diverse technical skills, a track record of impactful projects, and a commitment to community and professional 
                    development.`
                }
            ]
        },
        generationConfig: {
            temperature: 1,
            topK: 64,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain"
        }
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, false); // false for synchronous request
    xhr.setRequestHeader("Content-Type", "application/json");
    
    try {
        xhr.send(JSON.stringify(postData));
        
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log('Full API response:', response);
            if (response.candidates && response.candidates[0] && response.candidates[0].content) {
                return response.candidates[0].content.parts[0].text;
            } else {
                console.error('Unexpected response structure:', response);
                return "Received an unexpected response structure from the API.";
            }
        } else {
            console.error('Error:', xhr.status, xhr.statusText);
            console.error('Response:', xhr.responseText);
            return `An error occurred: ${xhr.status} ${xhr.statusText}. Details: ${xhr.responseText}`;
        }
    } catch (error) {
        console.error('Error:', error);
        return "An error occurred while processing your request. Please try again later.";
    }

}
