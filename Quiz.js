
    <script>
        const questions = [
            {question: "Who was the first President of the United States?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], correctAnswer: 0},
            {question: "In which year did World War II end?", options: ["1945", "1939", "1918", "1965"], correctAnswer: 0},
            {question: "Who was the famous queen of ancient Egypt?", options: ["Cleopatra", "Nefertiti", "Hatshepsut", "Isis"], correctAnswer: 0},
            {question: "Who was the leader of the Soviet Union during World War II?", options: ["Joseph Stalin", "Leon Trotsky", "Vladimir Lenin", "Mikhail Gorbachev"], correctAnswer: 0},
            {question: "Which empire was ruled by Julius Caesar?", options: ["Roman Empire", "Ottoman Empire", "British Empire", "Mongol Empire"], correctAnswer: 0}
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let timer;
        let timeLeft = 10; // Timer for each question

        function loadQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            
            document.getElementById("question").textContent = currentQuestion.question;
            currentQuestion.options.forEach((option, index) => {
                document.getElementById(`option${index+1}Label`).textContent = option;
            });

            // Reset colors and enable options
            const options = document.querySelectorAll('input[name="answer"]');
            options.forEach(option => {
                option.disabled = false;
                option.checked = false;
                const label = document.querySelector(`label[for=${option.id}]`);
                label.style.color = 'white';
            });

            // Reset progress bar
            document.getElementById("progress").style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

            // Reset and start the timer
            timeLeft = 10;
            document.getElementById("time").textContent = timeLeft;
            clearInterval(timer);
            timer = setInterval(updateTimer, 1000);
        }

        function updateTimer() {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById("time").textContent = timeLeft;
            } else {
                nextQuestion();
            }
        }

        function nextQuestion() {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            if (selectedAnswer) {
                const selectedAnswerIndex = parseInt(selectedAnswer.value);
                const correctAnswerIndex = questions[currentQuestionIndex].correctAnswer;
                
                // Provide feedback
                const options = document.querySelectorAll('input[name="answer"]');
                options.forEach((option, index) => {
                    const label = document.querySelector(`label[for=${option.id}]`);
                    if (index === correctAnswerIndex) {
                        label.style.color = 'green'; // Correct answer
                    } else if (index === selectedAnswerIndex) {
                        label.style.color = 'red'; // Incorrect answer
                    }
                    option.disabled = true;
                });

                if (selectedAnswerIndex === correctAnswerIndex) {
                    score++;
                }

                currentQuestionIndex++;

                if (currentQuestionIndex < questions.length) {
                    setTimeout(loadQuestion, 1000); // Delay for feedback before next question
                } else {
                    setTimeout(showScore, 1000); // Delay to show score at the end
                }
            } else {
                alert("Please select an answer.");
            }
        }

        function showScore() {
            document.getElementById("quiz").classList.add("hidden");
            document.getElementById("scoreContainer").classList.remove("hidden");
            document.getElementById("score").textContent = score;
        }

        function restartQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            document.getElementById("quiz").classList.remove("hidden");
            document.getElementById("scoreContainer").classList.add("hidden");
            loadQuestion();
        }

        // Event listeners
        document.getElementById("nextBtn").addEventListener("click", nextQuestion);

        // Initial load
        loadQuestion();
    </script>
