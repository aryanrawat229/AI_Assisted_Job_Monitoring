from bs4 import BeautifulSoup
import os, json

jobs_data = []

for file in os.listdir("data"):
    with open(f"data/{file}", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

    title_tag = soup.find("a", class_="title")

    job = {
        "title": title_tag.get_text(strip=True),
        "company": soup.find("a", class_="comp-name").get_text(strip=True),
        "experience": soup.find("span", class_="expwdth").get_text(strip=True),
        "location": soup.find("span", class_="locWdth").get_text(strip=True),
        "posted": soup.find("span", class_="job-post-day").get_text(strip=True),
        "description": soup.find("span", class_="job-desc").get_text(strip=True),
        "skills": [
            li.get_text(strip=True)
            for li in soup.select("ul.tags-gt li")
        ],
        "rating": soup.find("span", class_="main-2").get_text(strip=True)
        if soup.find("span", class_="main-2") else None,
        "link": title_tag["href"],
    }

    jobs_data.append(job)

# Save to JSON
with open("jobs.json", "w", encoding="utf-8") as f:
    json.dump(jobs_data, f, indent=2)

print(f"{len(jobs_data)} jobs parsed and saved")
