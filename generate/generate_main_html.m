function generate_main_html()
xls_name = 'daytime.xlsx';
sheet = 'Sheet1';
xlrange = 'A1:E96';
[~,~,time_table] = xlsread(xls_name, sheet, xlrange);
time_table = time_table(:,[1,5]);

fin_head = fopen('head.html','r');
head = fread(fin_head);
fin_tail = fopen('tail.html','r');
tail = fread(fin_tail);
fout = fopen('../index.html','w');
fwrite(fout,head);
for i = 1:size(time_table,1)
    fprintf(fout,'<tr><td id="timelist%d" class="%s timelist">%s</td></tr>\n', i, time_table{i,2},time_table{i,1});
end
fwrite(fout,tail);
fclose(fout);
fclose(fin_head);
fclose(fin_tail);
end

