from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time, os

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 15)

os.makedirs("data", exist_ok=True)

driver.get(
    "https://www.naukri.com/jobs-in-india?"
    "functionAreaIdGid=4&functionAreaIdGid=5&functionAreaIdGid=8&experience=1"
)

# Scroll
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(3)

jobs = wait.until(
    EC.presence_of_all_elements_located(
        (By.XPATH, "//div[contains(@class,'cust-job-tuple')]")
    )
)

print(f"Jobs found: {len(jobs)}")

for i, job in enumerate(jobs, start=1):
    html = job.get_attribute("outerHTML")
    with open(f"data/job_{i}.html", "w", encoding="utf-8") as f:
        f.write(html)

driver.quit()
