import sys
import json

class ElectionAssistant:
    def __init__(self):
        self.knowledge_base = {
            "process": [
                "1. Voter Registration: Check eligibility and register online or at local booths.",
                "2. Verification: Authorities verify your address and ID.",
                "3. Election Calendar: Follow the dates for nomination and campaigning.",
                "4. Polling Day: Go to your booth with a valid ID card.",
                "5. Results: Votes are counted and winners declared."
            ],
            "timelines": {
                "Registration": "Ends 30 days before election",
                "Nominations": "Open 45 days before election",
                "Voting Day": "May 15, 2026",
                "Results": "May 20, 2026"
            },
            "steps_to_vote": [
                "Step 1: Locate your polling station using your Voter ID.",
                "Step 2: Reach the booth between 7 AM and 6 PM.",
                "Step 3: Identity verification by polling officer.",
                "Step 4: Press the button next to your candidate on the EVM.",
                "Step 5: Verify the VVPAT slip."
            ]
        }

    def get_response(self, query):
        query = query.lower()
        if "process" in query:
            return "\n".join(self.knowledge_base["process"])
        elif "time" in query or "date" in query or "when" in query:
            return "\n".join([f"{k}: {v}" for k, v in self.knowledge_base["timelines"].items()])
        elif "step" in query or "how" in query:
            return "\n".join(self.knowledge_base["steps_to_vote"])
        else:
            return "I can help with election process, timelines, and voting steps. Try asking 'What is the process?' or 'When is the election?'"

def main():
    assistant = ElectionAssistant()
    print("--- Election Assistant (Python) ---")
    print("Type 'exit' to quit.")
    while True:
        try:
            user_input = input("\nYou: ")
            if user_input.lower() in ['exit', 'quit']:
                break
            response = assistant.get_response(user_input)
            print(f"Assistant: {response}")
        except EOFError:
            break

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--api":
        # Simple JSON output for integration
        assistant = ElectionAssistant()
        query = " ".join(sys.argv[2:])
        print(json.dumps({"response": assistant.get_response(query)}))
    else:
        main()
