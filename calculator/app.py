from flask import Flask, request, render_template_string  # pyright: ignore[reportMissingImports]

app = Flask(__name__)

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Flask Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #eef2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .card {
            background: white;
            padding: 25px;
            width: 320px;
            border-radius: 8px;
            box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }
        h2 {
            text-align: center;
        }
        input, select, button {
            width: 100%;
            padding: 8px;
            margin-top: 10px;
            font-size: 16px;
        }
        button {
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background: #0056b3;
        }
        .result {
            margin-top: 15px;
            color: green;
            font-weight: bold;
            text-align: center;
        }
        .error {
            margin-top: 15px;
            color: red;
            text-align: center;
        }
    </style>
</head>
<body>

<div class="card">
    <h2>Flask Calculator</h2>

    <form method="POST">
        <input type="number" step="any" name="a" placeholder="First number" required>

        <select name="op">
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
        </select>

        <input type="number" step="any" name="b" placeholder="Second number" required>

        <button type="submit">Calculate</button>
    </form>

    {% if result is not none %}
        <div class="result">Result: {{ result }}</div>
    {% endif %}

    {% if error %}
        <div class="error">{{ error }}</div>
    {% endif %}
</div>

</body>
</html>
"""

@app.route("/", methods=["GET", "POST"])
def calculator():
    result = None
    error = None

    if request.method == "POST":
        try:
            a = float(request.form["a"])
            b = float(request.form["b"])
            op = request.form["op"]

            if op == "+":
                result = a + b
            elif op == "-":
                result = a - b
            elif op == "*":
                result = a * b
            elif op == "/":
                if b == 0:
                    error = "Division by zero is not allowed"
                else:
                    result = a / b
            else:
                error = "Invalid operator"

        except ValueError:
            error = "Invalid input"

    return render_template_string(HTML_TEMPLATE, result=result, error=error)

@app.route("/health")
def health():
    return {"status": "ok"}
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
