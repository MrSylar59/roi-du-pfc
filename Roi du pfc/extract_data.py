from openpyxl import load_workbook

wb = load_workbook(filename="data_raw.xlsx", read_only=True)
ws = wb["query_result"]

for i in range(1, 5):
    print(i, ws.cell(row=i, column=3).value)