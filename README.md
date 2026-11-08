# PolyGlot × Hatafuku Studio Pro

สตูดิโอสร้างสื่อการเรียนรู้ ใบงาน ปริศนา สติกเกอร์ 3D ธีมไลน์ และระบบเรียนภาษา PolyGlot

## รันในเครื่อง

ต้องมี Node.js (ไม่ต้องใช้ API key)

1. `npm install`
2. `npm run dev` (หรือ `npm start` เพื่อ build แล้วรันแบบจริง) แล้วเปิด http://localhost:3200

> ห้ามเปิดโฟลเดอร์โปรเจกต์ด้วยเซิร์ฟเวอร์ไฟล์ธรรมดา (http.server, Live Server) หรือดับเบิลคลิก index.html จะขึ้นจอขาว เพราะ `src/main.tsx` ต้องผ่าน Vite
> ถ้าจะเอาไปโฮสต์ ให้ `npm run build` แล้วใช้โฟลเดอร์ `dist/` (path เป็น relative แล้ว ใช้ได้ทุกโฟลเดอร์)

## สำรอง/กู้คืนงาน

ปุ่ม "สำรอง" และ "กู้คืน" ที่แถบบนสุด จะบันทึกและกู้ข้อมูลของทุกโมดูลเป็นไฟล์ .json ไฟล์เดียว

## โครงสร้าง

- `src/` แอปหลัก React และเครื่องมือแบบ native
- `public/apps/` โมดูล HTML แบบ standalone (ฝังผ่าน iframe) ลิงก์อยู่ใน `src/data/modulesData.ts`

## ขึ้น GitHub + เปิดเว็บฟรี (GitHub Pages)

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<ชื่อคุณ>/<ชื่อรีโป>.git
git push -u origin main
```

จากนั้นที่รีโป: **Settings → Pages → Source เลือก "GitHub Actions"**
ทุกครั้งที่ push เข้า `main` ระบบจะ build และอัปเดตเว็บให้เอง (ดูสถานะในแท็บ Actions)
เว็บจะอยู่ที่ `https://<ชื่อคุณ>.github.io/<ชื่อรีโป>/`

## อัปเดตล่าสุด: Puffy Balloon Studio Pro

- แก้ฟอนต์ใช้ไม่ได้ (service worker แคชลิงก์ Google Fonts ทับกัน) และโหลดฟอนต์ทีละตัวตามที่เลือก
- ค้นหา/สุ่ม/ตัวอย่างฟอนต์ เลือกฟอนต์ตามภาษาอัตโนมัติ คัดลอกรูป Ctrl+S
- เมนู 🚀 เครื่องมือ Pro: เอฟเฟกต์วัสดุ (กลิตเตอร์ ขนปุย น้ำใส เยลลี่สองสี) ชุดคำ 5 ภาษา สไตล์โปรด สุ่มสไตล์ทั้งชุด ตรวจเกณฑ์ LINE พรีวิวแชต LINE ฟอนต์ออฟไลน์
- ดูวิธีฟอนต์ออฟไลน์ที่ `fonts/README.md`
