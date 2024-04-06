# PPL

## Git branching

Repository akan memiliki 2 branch utama, yaitu main dan development.
Setiap pembuatan branch baru, buat branch baru dengan base development.
Format: `<tipe>/<judul>`

List tipe:

- Story, untuk fitur atau use case baru
- Task, untuk bug fixing, performance improvement, refactor, dsb.

Judul: gunakan kebab case

Contoh:

- story/api-attendance
- story/page-attendance
- task/improve-sql-performance-on-xxxx-method

Setelah selesai, Pull Request ke development dan wajib minta review ke scrum master.

## Code Styling & Repository

Sangat dimohon untuk memperhatikan hal-hal berikut:

1. Penamaan variabel, fungsi, dan kelas yang bermakna.
2. Penyingkatan harus mudah ditebak dan masih terbaca.
   - Misalkan, codeStylingAndRepository, terlalu panjang, disingkat menjadi: codeStyleNRepo.
   - Yang Salah: csnr, cdStNrep.
3. Membuat kelas, type, dan interface dengan pascal case (ClassName).
4. Membuat fungsi dan variable dengan camel case (fungsiDanVariabel).
5. Membuat folder dengan kebab case (nama-folder).
6. Membuat file mengikuti convention berikut.  
   a. Penamaan komponen react menggunakan pascal case (NamaKomponen).  
   b. Penamaan hook menggunakan camel case dengan diawali use (useNama).  
   c. Penamaan file selain yang disebutkan di atas menggunakan kebab case (nama-file).

## Penggunaan DataTable

Use DataTable by defining columns, `useReactTable` hook, and React `DataTable` component

### DataTable React Component

Mandatory to pass `table` that is defined using `useReactTable` hook. example:

```javascript
<DataTable
  table={table}
  headline="Kelola Akun Pengguna"
  searchValue={searchValue}
  setSearchValue={handleSearchValueChange}
  onClickCreate={onClickCreate}
/>
```

Features/Props (All are optional):

1. `headline`: Adds headline on top of table
2. `description`: Adds description under headline
3. `searchValue`: State prop for `input` value in search box
4. `searchPlaceholder`: Placeholder for `input` in search box
5. `setSearchValue`: SetState callback prop for `input` value in search box
6. `onClickDelete`: OnClick callback for delete button
7. `onClickFilter`: OnClick callback for filter button
8. `onClickCreate`: OnClick callback for create button

### useReactTable Hook

Hook to define options for `DataTable` component

```javascript
const table = useReactTable({
  columns,
  data,
  manualPagination: true,
  rowCount: rowCount,
  getCoreRowModel: getCoreRowModel(),
  columnResizeMode: "onChange",
  onPaginationChange: setPagination,
  initialState: {
    pagination,
  },
});
```

Fields (not exhaustive):

1. `data`: Data that you want to display
2. `columns`: Column definitions (sizing, content, etc.) for table
3. `manualPagination`: Lets us to use BE pagination logic
4. `rowCount`: Total number of rows in data (not just data displayed), must be provided from BE
5. `getCoreRowModel`: Idk what it does but use as above
6. `columnResizeMode`: Column resize is enabled, allow for smooth resize
7. `pagination`: Pagination state, use `useState` to store `PaginationState` object

### Column Definitions

Define column sizing, content, data, etc. Use `columnHelper` <strong>don't forget to set the type</strong>, define each column with `columnHelper.accessor`, first argument is the data field (defined in type passed to `columnHelper`) that the column wants to display.

example:

```javascript
// outside of hook, in global scope of file
const columnHelper = createColumnHelper<Person>()

// ...
// inside of hook
    const columns = [
        columnHelper.accessor('visits', {
            id: 'visits-checkbox'
            header: () => <span>Visits</span>,
            size: 150,
            minSize: 150,
            enableSorting: false,
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value: boolean) => row.toggleSelected(value)}
                />
            ),
        }),
        // ...
    ]
// ...
```

Notes:

- Define `columnHelper` outside of hook function
- You can define columns in a different hook, e.g. `useDashboardColumns.tsx`

Fields:

1. `id`: Optional field to define id, <strong>use in case many columns use the same accessor</strong>
2. `header`: Can be JSX or string, defines Header to be used
3. `size`: Defines starting width of columns, reccommended to set as the same as `minSize`
4. `minSize`: Defines minimum width of columns
5. `enableSorting`: Defaults to true, <b>use to disable sorting for columns like row number, checkbox, and action</b>
6. `cell`: Defaults to displaying data as is, can be modified to show given JSX, get data for cell or its row using props in its function, - `getValue()`: Gets value of data in the cell - `row`: Information about row of data, access all data of row using `row.original`

## Folder

```
public
├ assets
├ fonts
├ icon
└ image
src
├ assets
├ components
│ └ ui
├ config
├ hooks
├ layouts
│ └ components
├ lib
├ pages
│ └ <nama-page>
│   ├ components
│   ├ hooks
│   └ <NamaPage>.tsx
├ router
└ types

```

- `public`  
   a. Berisi aset publik yang dapat diakses melalui url https://domain/public/  
   b. Aset dikategorikan menjadi icon dan image, selain itu masukkan ke folder assets saja.  
   c. Untuk setiap aset, buat folder baru sesuai nama page dimana aset tersebut digunakan
  (ex: public/icon/kelola-akun).  
   d. Jika aset digunakan di lebih dari satu page, simpan aset di root kategori saja
  (ex: public/image).
- `src/assets`  
   a. Berisi aset statik yang di-compile pada saat build time.  
   b. Untuk setiap aset, buat folder baru sesuai nama page dimana aset tersebut digunakan
  (ex: assets/registrasi-tesis).
- `src/components`  
   a. Berisi komponen global yang digunakan pada lebih dari satu page.  
   b. `src/components/ui` berisi komponen khusus Shadcn. Jika ingin meng-extend, buat folder baru
  dengan nama komponen yang ingin di-extend.
- `src/config`  
   a. Berisi konfigurasi global, contohnya kofigurasi axios.
- `src/hooks`  
   a. Berisi hook global yang digunakan pada lebih dari satu page.
- `src/layouts`  
   a. Berisi layout yang digunakan pada aplikasi, contohnya sidebar.  
   b. `src/layouts/components` berisi komponen yang digunakan oleh sebuah layout.
- `src/lib`  
   a. Berisi fungsi utility atau helper.
- `src/pages`  
   a. Berisi setiap page yang akan ditampilkan.  
   b. Untuk setiap page, buat folder baru sesuai dengan nama page nya (ex: src/pages/alokasi-topik)
  dan berisi setidaknya satu file komponen untuk page tersebut (AlokasiTopik.tsx).  
   c. `src/pages/<nama-page>/components` digunakan untuk menyimpan komponen yang digunakan oleh
  page tersebut.  
   d. `src/pages/<nama-page>/hooks` digunakan untuk menyimpan hook (business logic) yang digunakan
  oleh page tersebut.  
   e. Jika terdapat lebih dari satu page dengan fungsionalitas yang mirip, boleh dibuat folder baru
  (ex: src/pages/tugas-akhir).  
   f. Pisahkan business logic dengan komponen. Simpan seluruh business logic pada hook, sementara
  file komponen hanya berisi ui (jsx) saja. Contohnya bisa dilihat di folder
  src/pages/manajemen-akun/kelola-akun.
- `src/router`  
   a. Berisi routing aplikasi. Page yang baru dibuat ditambahkan ke dalam file router.tsx.
  Referensi: https://reactrouter.com/en/main/start/tutorial.  
   b. Jangan meng-import komponen langsung ke router.tsx, gunakan file imports.ts untuk melakukan
  lazy loading.
- `src/types`  
   a. Berisi type dan interface typescript yang digunakan.

## Semantic Commit Message

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

## Local Development Setup

### Git

Authorize ke github menggunakan SSH/ HTTPs. Referensi untuk SSH:

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

### Requirements

1. Node versi 21

### Instalasi Requirements

1. Install node 21 melalui node version manager. Referensi: https://github.com/nvm-sh/nvm#installing-and-updating

`nvm install lts/hydrogen`

### Langkah-Langkah

1. Clone repo `git clone git@gitlab.informatika.org:if3250-2024-ta1-ta2/if3250_2024_k01_11_k02_02_app-frontend.git` atau `git clone https://gitlab.informatika.org/if3250-2024-ta1-ta2/if3250_2024_k01_11_k02_02_app-frontend.git`
2. Install dependencies `npm install`
3. Sesuaikan env dengan file .env.example
4. Jalankan local dev derver `npm run dev`
