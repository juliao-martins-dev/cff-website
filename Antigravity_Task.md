# Antigravity Task — CFF Website

> **Mục đích file này:** Mô tả công việc cần thực hiện trên codebase để Antigravity đọc và viết/sửa code.
> **Quy ước:** Mỗi lần có việc mới, phần "TASK HIỆN TẠI" được cập nhật ở đầu file. Phần "ĐÃ HOÀN THÀNH" là lịch sử.

---

## TASK HIỆN TẠI

*Hiện tại không có task nào.*

---

## BỐI CẢNH DỰ ÁN

- **Tên:** Children's Future Foundation (CFF) — website tổ chức phi lợi nhuận, Timor-Leste.
- **Loại:** Static website — **HTML + CSS + JS thuần**, KHÔNG build step, KHÔNG framework, KHÔNG dependency npm.
- **Thư mục gốc:** `CFF Website/`
- **Nguồn nội dung:** `Brief/INFORMATION.pdf` + `Brief/CFF Website info.pdf` + `Brief/SOME INFORMATION FOR WEBSITE.pdf` (bổ sung v5). Tổng hợp ở `DESCRIPTION.md`.
- **Preview:** `cd "CFF Website" && python3 -m http.server 8000` → mở `http://localhost:8000`.

### Cấu trúc file hiện có
```
CFF Website/
├─ index.html · about.html · programs.html · news.html · donate.html · contact.html
├─ volunteer.html · partner.html   (v5 — tạo mới)
├─ assets/
│  ├─ css/styles.css   (style + design tokens ở :root; có rule đa ngữ + .lang + .ph)
│  ├─ js/main.js       (mobile nav, scroll reveal, count-up, contact form, year, language toggle EN/TE/PT)
│  ├─ img/Logo.jpeg    (logo brand + favicon)
│  └─ img/PHOTOS/      (26 ảnh thật .jpg — đã có)
├─ DESCRIPTION.md · README.md · Antigravity_Task.md
```

---

## QUY TẮC BẮT BUỘC KHI SỬA CODE

1. **Không thêm framework/build tool.** Giữ HTML/CSS/JS thuần.
2. **Dùng design token** trong `:root` của `assets/css/styles.css`, KHÔNG hardcode mã màu rải rác.
   - Bảng màu brand: `--midnight:#013D5A` (primary) · `--marigold:#F5A23B` (accent CTA) · `--herb:#708C69` · `--celeste:#BDD3C1` · `--lionsmane:#FCF3E3` / `--bg:#FBF6EC`.
   - Font: `--font-display: Fraunces` (heading), `--font-body: Mulish` (body).
3. **Header và footer lặp y hệt trong tất cả các trang** (6 trang gốc + `volunteer.html` + `partner.html`). Sửa header/footer phải **đồng bộ mọi file** (chỉ khác `aria-current="page"` + switcher EN/TE/PT).
4. **Accent (marigold) tối đa ~2 lần/màn hình.**
5. **KHÔNG bịa số liệu** — chỉ dùng dữ kiện có thật trong brief.
6. **KHÔNG dùng ảnh CDN ngoài.** Ảnh thật trong `assets/img/PHOTOS/`; chỗ chưa có ảnh dùng `.ph` placeholder.
7. **KHÔNG dùng emoji làm icon.** Icon = SVG monoline `stroke="currentColor"`.
8. Giữ **accessibility**: skip-link, `:focus-visible`, `alt` cho ảnh, ARIA cho nav.
9. Giữ **responsive**: breakpoints 940px (nav mobile), 900/820/620px (grid).
10. **ĐA NGỮ BẮT BUỘC (EN + TE + PT):** mọi text hiển thị mới/sửa đều phải có **cả 3 ngôn ngữ**, bọc `<span data-lang-en>…</span><span data-lang-tt>…</span><span data-lang-pt>…</span>`. Không thêm text thiếu ngôn ngữ. Tetun (TE) và Português (PT) do AI dịch → **cần người bản xứ rà soát**.

---

## ĐÃ HOÀN THÀNH (lịch sử)

### [v5] Bổ sung nội dung theo `SOME INFORMATION FOR WEBSITE.pdf` — DONE
- **about.html:** thêm Licinia Ramos Horta (Managing Director, ảnh tạm placeholder — chờ khách gửi file), Tony Sum đổi thành Program Director.
- **volunteer.html + partner.html:** tạo mới, đủ nội dung PDF (Why / Opportunities / Who can apply·partner / liên hệ), header/footer đồng bộ.
- **donate.html:** thêm Why Donate, How it helps, Ways to Donate, **chi tiết ngân hàng thật** (BNU · Fundação Children and The Future · 0020156541521000162 · SWIFT CGDITLDI), Transparency, Contact (donations@cff.tl).
- **contact.html + toàn site:** phone +670 3319954 (`tel:`), link Facebook thật, location + Google Maps (contact.html nhúng iframe map thay placeholder).
- **3 ngôn ngữ EN/TE/PT:** thêm nút PT vào switcher mọi trang; `main.js` `setLang` nhận `pt`; CSS thêm rule `[data-lang-pt]`/`html[lang="pt"]`; mọi text có đủ 3 span (kiểm: số span EN=TE=PT khớp từng trang).
- **Điều hướng:** card "Get involved" + footer trỏ `volunteer.html`/`partner.html`.
- ⚠️ Bản dịch TE + PT do AI soạn → **cần người bản xứ rà soát**. Ảnh Licinia chưa có file (placeholder).

### [v4] Dùng logo thật (`assets/img/Logo.jpeg`) thay logo SVG vẽ tay — DONE
- Thay thế toàn bộ SVG logo thủ công trong header và footer của cả 6 trang bằng ảnh `assets/img/Logo.jpeg`.
- Cấu hình CSS cho logo hiển thị đẹp mắt, giữ tỷ lệ và có nền trắng bo tròn nhẹ trong footer.
- Thêm thẻ `link` icon (favicon) chỉ đến `Logo.jpeg` trong `<head>` của cả 6 trang.

### [v3] Chèn ảnh thật vào website (thay placeholder `.ph`) — DONE
- Thêm CSS `.ph > img` (object-fit cover) + `.ph:has(> img)::after { display:none }` để ảnh phủ kín placeholder và ẩn nhãn.
- Chèn `<img>` ảnh thật từ `assets/img/PHOTOS/` vào các vị trí ở index/about/programs/news/donate; bỏ `aria-hidden` ở `.ph` có ảnh (trừ `.hero__media`); `loading="lazy"` trừ 3 ảnh hero.
- Giữ placeholder: leadership ô Tony Sum & Board (chưa có ảnh), ô map ở contact.

### [v2] Toggle ngôn ngữ EN / TE + song ngữ toàn site — DONE
- Thêm switcher **EN | TE** vào `.nav__actions` cả 6 trang; bọc toàn bộ text hiển thị bằng `<span data-lang-en>/<span data-lang-tt>`.
- `main.js`: hàm `setLang()` đổi `<html lang>`, lưu `localStorage("cff-lang")`, set `aria-pressed`; mặc định EN; contact form báo theo ngôn ngữ.
- CSS song ngữ (`html[lang="tet"]` + `[data-lang-en]/[data-lang-tt]`) đã có từ v1.
- ⚠️ Bản dịch Tetun do AI soạn — **cần người bản xứ rà soát** (sửa trong `<span data-lang-tt>`). Bảng dịch đầy đủ đã lưu ở lịch sử commit/bản v2 trước của file này nếu cần tra lại.

### [v1] Dựng toàn bộ frontend tĩnh 6 trang — DONE
- **Design system** (`styles.css`): tokens màu/typography/scale; components `.btn`, header/nav (sticky + mobile), `.lang`, `.ph` (placeholder ảnh), `.hero`, `.card`, `.pcard`, `.action`, `.checklist`, `.pillar`, `.split`, `.person`, `.cta-banner`, form, footer; `prefers-reduced-motion`.
- **JS** (`main.js`): mobile nav, reveal-on-scroll, count-up, contact form (demo), năm tự động.
- **6 trang HTML** theo brief: Home (hero/who-we-are/4 program card/3 news/3 get-involved/CTA), About (mission/7 objectives/why-created/3 pillars/leadership), Programs (4 mục: Objective·Activities·Beneficiaries·ảnh), News (3 story cards), Donate (your-donation-helps/3 methods), Contact (info/form/map).
- **Tài liệu:** `DESCRIPTION.md`, `README.md`.
- Placeholder còn treo: SĐT, ảnh+bio Tony Sum/Board, chi tiết bank transfer, donation online, đối chiếu HEX Herb/Marigold, nối contact form vào backend.
