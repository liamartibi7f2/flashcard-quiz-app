/* ============================================================
   Flashcard Quiz App — All JavaScript
   ============================================================ */

// ===== 1. CONSTANTS =====
const STORAGE_KEY = 'flashcardApp';
const BACKUP_KEY = 'flashcardApp_backup';
const APP_VERSION = 1;
const MS_PER_DAY = 86400000;
const MS_PER_MIN = 60000;

/** Pre-built deck: 100 Câu Luật Hành chính (imported with one click) */
const PRESET_DECK_NAME = '100 Câu Luật Hành chính (Tháng 6/2026)';

/** Pre-built deck data for one-click import */
const PRESET_DECK = {"id":"d_lhc_100_930849","name":"100 Câu Luật Hành chính (Tháng 6/2026)","description":"100 câu hỏi trắc nghiệm ôn thi môn Luật Hành chính - Có đáp án","cards":[{"front":"Câu 1: Luật Hành chính Việt Nam điều chỉnh các quan hệ xã hội nào dưới đây?","back":"✅ Đáp án: A. Các quan hệ xã hội phát sinh trong quá trình thực hiện hoạt động chấp hành và điều hành của Nhà nước."},{"front":"Câu 2: Phương pháp điều chỉnh của Luật Hành chính là gì?","back":"✅ Đáp án: B. Phương pháp mệnh lệnh – đơn phương dựa trên quan hệ quyền uy và phục tùng trong quản lý nhà nước."},{"front":"Câu 3: Nguyên tắc pháp chế xã hội chủ nghĩa trong quản lý hành chính nhà nước đòi hỏi yêu cầu nào dưới đây?","back":"✅ Đáp án: A. Mọi hoạt động quản lý hành chính nhà nước phải được thực hiện phù hợp với Hiến pháp và pháp luật."},{"front":"Câu 4: Nội dung nào dưới đây phản ánh nguyên tắc tập trung dân chủ trong quản lý hành chính nhà nước?","back":"✅ Đáp án: D. Bảo đảm sự chỉ đạo tập trung trên cơ sở dân chủ đồng thời bảo đảm mở rộng dân chủ dưới sự lãnh đạo tập trung."},{"front":"Câu 5: Quy phạm pháp luật hành chính được hiểu là gì?","back":"✅ Đáp án: A. Là quy tắc xử sự chung do Nhà nước ban hành nhằm điều chỉnh các quan hệ xã hội phát sinh trong quản lý hành chính nhà nước."},{"front":"Câu 6: Quan hệ pháp luật hành chính được hiểu là gì?","back":"✅ Đáp án: C. Quan hệ xã hội phát sinh trong lĩnh vực chấp hành và điều hành, được điều chỉnh bởi quy phạm pháp luật hành chính."},{"front":"Câu 7: Theo Luật Tổ chức Chính phủ năm 2025, Chính phủ làm việc theo chế độ nào sau đây?","back":"✅ Đáp án: B. Chính phủ làm việc theo chế độ tập thể, quyết định theo đa số."},{"front":"Câu 8: Quan hệ pháp luật hành chính có đặc điểm nào dưới đây?","back":"✅ Đáp án: B. Một bên tham gia quan hệ sử dụng quyền lực nhà nước trong hoạt động quản lý hành chính."},{"front":"Câu 9: Chủ thể của quan hệ pháp luật hành chính có thể là chủ thể nào dưới đây?","back":"✅ Đáp án: A. Cơ quan hành chính nhà nước, cán bộ, công chức, tổ chức và cá nhân tham gia quan hệ pháp luật hành chính."},{"front":"Câu 10: Nguyên tắc bình đẳng giữa các dân tộc trong quản lý hành chính nhà nước thể hiện ở nội dung nào dưới đây?","back":"✅ Đáp án: A. Nhà nước bảo đảm quyền và nghĩa vụ ngang nhau của các dân tộc trong hoạt động quản lý hành chính nhà nước."},{"front":"Câu 11: Theo Luật Tổ chức Chính phủ năm 2025, Chính phủ thực hiện nhiệm vụ, quyền hạn của mình theo các căn cứ pháp lý nào sau đây?","back":"✅ Đáp án: D. Chính phủ thực hiện các nhiệm vụ, quyền hạn theo quy định của Hiến pháp, luật, nghị quyết của Quốc hội, pháp lệnh, nghị quyết của Ủy ban Thường vụ Quốc hội."},{"front":"Câu 12: UBND xã X ban hành quyết định thu hồi đất của hộ gia đình bà B để thực hiện dự án xây dựng khu đô thị. Bà B cho rằng quyết định thu hồi đất trái pháp luật vì chưa được công khai phương án bồi thường và chưa tổ chức đối thoại theo quy định. Theo pháp luật hiện hành, bà B có quyền nào sau đây?","back":"✅ Đáp án: B. Bà B có quyền khiếu nại quyết định hành chính hoặc khởi kiện vụ án hành chính theo quy định pháp luật."},{"front":"Câu 13: Ngày 01/3/2025, anh D nhận được quyết định xử phạt vi phạm hành chính. Đến ngày 30/11/2025, anh D mới nộp đơn khiếu nại mà không chứng minh được có sự kiện bất khả kháng hoặc trở ngại khách quan. Theo quy định pháp luật hiện hành:","back":"✅ Đáp án: C. Anh D đã hết thời hiệu khiếu nại theo quy định của Luật Khiếu nại."},{"front":"Câu 14: Quyết định hành chính nhà nước khi được ban hành phải bảo đảm yêu cầu nào dưới đây?","back":"✅ Đáp án: B. Phải bảo đảm tính hợp pháp và tính hợp lý về nội dung, hình thức và thủ tục ban hành quyết định."},{"front":"Câu 15: Quyết định hành chính cá biệt có đặc điểm nào dưới đây?","back":"✅ Đáp án: C. Được áp dụng một lần đối với một hoặc một số đối tượng cụ thể trong hoạt động quản lý hành chính nhà nước."},{"front":"Câu 16: Ông C là công chức địa chính cấp xã. Trong quá trình giải quyết hồ sơ cấp giấy chứng nhận quyền sử dụng đất, ông C cố tình gây khó khăn cho người dân nhằm nhằm gợi ý đưa tiền để được giải quyết nhanh. Hành vi của ông C vi phạm nguyên tắc nào khi thi hành công vụ?","back":"✅ Đáp án: B. Tuân thủ pháp luật, bảo đảm liêm chính, khách quan và đạo đức công vụ."},{"front":"Câu 17: Theo Luật Tổ chức Chính phủ năm 2025, Bộ trưởng có thẩm quyền ban hành loại văn bản nào sau đây?","back":"✅ Đáp án: B. Thông tư để hướng dẫn thực hiện văn bản của cơ quan nhà nước cấp trên theo thẩm quyền."},{"front":"Câu 18: Theo Luật Tổ chức chính quyền địa phương năm 2025, Ủy ban nhân dân chịu trách nhiệm trước cơ quan nào sau đây?","back":"✅ Đáp án: B. Hội đồng nhân dân cùng cấp và cơ quan hành chính nhà nước cấp trên theo quy định của pháp luật."},{"front":"Câu 19: Theo Luật Tổ chức chính quyền địa phương năm 2025, Ủy ban nhân dân tỉnh có nhiệm vụ, quyền hạn nào sau đây?","back":"✅ Đáp án: C. Tổ chức thi hành Hiến pháp, pháp luật, văn bản của cơ quan nhà nước cấp trên và nghị quyết của Hội đồng nhân dân cùng cấp."},{"front":"Câu 20: Quy phạm pháp luật hành chính thường được cấu thành từ những bộ phận nào dưới đây?","back":"✅ Đáp án: A. Giả định, quy định và chế tài nhằm xác định điều kiện áp dụng, cách xử sự và hậu quả pháp lý đối với chủ thể có liên quan."},{"front":"Câu 21: Quan hệ pháp luật hành chính phát sinh khi có những điều kiện nào sau đây?","back":"✅ Đáp án: A. Có quy phạm pháp luật hành chính, có chủ thể tham gia quan hệ pháp luật hành chính và có sự kiện pháp lý phát sinh."},{"front":"Câu 22: Quy phạm pháp luật hành chính được thực hiện thông qua những hình thức nào dưới đây?","back":"✅ Đáp án: A. Tuân thủ pháp luật, chấp hành pháp luật, sử dụng pháp luật và áp dụng pháp luật."},{"front":"Câu 23: Cơ quan hành chính nhà nước cao nhất là cơ quan nào?","back":"✅ Đáp án: B. Chính phủ của nước Cộng hòa xã hội chủ nghĩa Việt Nam."},{"front":"Câu 24: Cơ quan hành chính nhà nước ở địa phương là cơ quan nào?","back":"✅ Đáp án: B. Ủy ban nhân dân các cấp thực hiện chức năng quản lý hành chính nhà nước tại địa phương."},{"front":"Câu 25: Bộ và cơ quan ngang bộ là cơ quan nào dưới đây?","back":"✅ Đáp án: C. Cơ quan thuộc Chính phủ thực hiện chức năng quản lý nhà nước về ngành, lĩnh vực và dịch vụ công thuộc phạm vi quản lý nhà nước trong cả nước."},{"front":"Câu 26: Cơ quan chuyên môn thuộc Ủy ban nhân dân được tổ chức nhằm thực hiện chức năng nhiệm vụ nào dưới đây?","back":"✅ Đáp án: B. Thực hiện chức năng tham mưu, giúp Ủy ban nhân dân quản lý nhà nước về ngành, lĩnh vực ở địa phương."},{"front":"Câu 27: Khi thực hiện cơ chế một cửa, một dấu. một cửa liên thông cần đáp ứng nguyên tắc nào sau đây?","back":"✅ Đáp án: C. Lấy sự hài lòng của tổ chức, cá nhân về chất lượng giải quyết thủ tục hành chính làm thước đo chất lượng phục vụ của cơ quan hành chính nhà nước."},{"front":"Câu 28: Theo quy định của pháp luật Việt Nam, người nước ngoài và người không quốc tịch cư trú tại Việt Nam có nghĩa vụ nào sau đây?","back":"✅ Đáp án: A. Tuân thủ Hiến pháp và pháp luật Việt Nam trong thời gian cư trú trên lãnh thổ Việt Nam."},{"front":"Câu 29: Bộ phận Một cửa có trách nhiệm nào sau đây?","back":"✅ Đáp án: C. Tiếp nhận, số hóa, chuyển xử lý và trả kết quả giải quyết thủ tục hành chính theo quy định pháp luật."},{"front":"Câu 30: Việc số hóa hồ sơ, kết quả giải quyết thủ tục hành chính nhằm mục đích nào sau đây?","back":"✅ Đáp án: D. Tái sử dụng dữ liệu, giảm giấy tờ và nâng cao hiệu quả giải quyết thủ tục hành chính điện tử."},{"front":"Câu 31: Cơ quan có thẩm quyền không được yêu cầu tổ chức, cá nhân thực hiện nội dung nào dưới đây?","back":"✅ Đáp án: C. Cung cấp lại thông tin, dữ liệu đã có trong cơ sở dữ liệu quốc gia hoặc cơ sở dữ liệu chuyên ngành."},{"front":"Câu 32: Cơ chế một cửa liên thông được hiểu là gì?","back":"✅ Đáp án: B. Phương thức phối hợp giữa các cơ quan có thẩm quyền trong tiếp nhận, giải quyết và trả kết quả thủ tục hành chính cho tổ chức, cá nhân."},{"front":"Câu 33: Việc thực hiện thủ tục hành chính trên môi trường điện tử phải bảo đảm yêu cầu nào sau đây?","back":"✅ Đáp án: C. An toàn thông tin, bảo mật dữ liệu và xác thực điện tử theo quy định của pháp luật hiện hành."},{"front":"Câu 34: Theo quy định của Luật Xử lý vi phạm hành chính, vi phạm hành chính được hiểu là gì?","back":"✅ Đáp án: A. Hành vi có lỗi do cá nhân, tổ chức thực hiện, vi phạm quy định của pháp luật về quản lý nhà nước mà không phải là tội phạm."},{"front":"Câu 35: Nguyên tắc xử lý vi phạm hành chính được quy định như thế nào?","back":"✅ Đáp án: B. Việc xử lý vi phạm hành chính phải bảo đảm công bằng, công khai, khách quan và đúng quy định pháp luật."},{"front":"Câu 36: Hình thức xử phạt chính bao gồm những hình thức nào dưới đây?","back":"✅ Đáp án: B. Cảnh cáo, phạt tiền và trục xuất theo quy định của Luật Xử lý vi phạm hành chính."},{"front":"Câu 37: Bà M là giáo viên trường trung học phổ thông công lập A, được tuyển dụng theo chế độ hợp đồng làm việc và hưởng lương từ quỹ lương của trường. Theo pháp luật hiện hành, bà M là:","back":"✅ Đáp án: D. Người lao động theo chế độ hợp đồng lao động."},{"front":"Câu 38: Theo quy định của Luật Xử lý vi phạm hành chính, biện pháp khắc phục hậu quả bao gồm nội dung nào dưới đây?","back":"✅ Đáp án: A. Buộc khôi phục lại tình trạng ban đầu, buộc tháo dỡ công trình vi phạm và buộc nộp lại số lợi bất hợp pháp có được do vi phạm hành chính."},{"front":"Câu 39: Theo quy định của pháp luật hiện hành, một hành vi vi phạm hành chính bị xử phạt như thế nào?","back":"✅ Đáp án: A. Một hành vi vi phạm hành chính chỉ bị xử phạt một lần."},{"front":"Câu 40: Theo quy định của Luật Xử lý vi phạm hành chính hiện hành, biên bản vi phạm hành chính phải có nội dung nào sau đây?","back":"✅ Đáp án: B. Thời gian, địa điểm lập biên bản và mô tả hành vi vi phạm hành chính."},{"front":"Câu 41: Theo Luật Xử lý vi phạm hành chính, tạm giữ tang vật, phương tiện vi phạm hành chính được áp dụng nhằm mục đích nào sau đây?","back":"✅ Đáp án: A. Để xác định hành vi vi phạm; làm rõ tình tiết trong vụ việc; hoặc để thi hành quyết định xử phạt"},{"front":"Câu 42: Theo quy định của Luật Xử lý vi phạm hành chính hiện hành, đối tượng có thể bị áp dụng biện pháp giáo dục tại xã, phường:","back":"✅ Đáp án: A. Người từ đủ 12 tuổi đến dưới 18 tuổi thuộc trường hợp áp dụng biện pháp giáo dục tại xã, phường theo quy định của Luật Xử lý vi phạm hành chính."},{"front":"Câu 43: Theo quy định pháp luật hiện hành, cá nhân, tổ chức bị xử phạt vi phạm hành chính có quyền:","back":"✅ Đáp án: B. Khiếu nại, khởi kiện đối với quyết định xử phạt vi phạm hành chính theo quy định pháp luật."},{"front":"Câu 44: Theo Luật Xử lý vi phạm hành chính, trường hợp nào sau đây không xử phạt vi phạm hành chính?","back":"✅ Đáp án: A. Cá nhân thực hiện hành vi vi phạm hành chính trong tình thế cấp thiết để tránh nguy cơ gây thiệt hại lớn hơn cho lợi ích được pháp luật bảo vệ."},{"front":"Câu 45: Theo quy định pháp luật hiện hành, thời hạn nộp tiền phạt vi phạm hành chính là bao lâu?","back":"✅ Đáp án: B. Trong thời hạn mười ngày kể từ ngày nhận được quyết định xử phạt vi phạm hành chính trừ trường hợp quyết định xử phạt ghi thời hạn dài hơn."},{"front":"Câu 46: Theo quy định pháp luật hiện hành, tang vật vi phạm hành chính bị tịch thu thuộc:","back":"✅ Đáp án: B. Sở hữu nhà nước và được xử lý theo quy định của pháp luật về quản lý tài sản công."},{"front":"Câu 47: Theo Luật Xử lý vi phạm hành chính, biện pháp ngăn chặn và bảo đảm xử lý vi phạm hành chính gồm:","back":"✅ Đáp án: A. Tạm giữ người, tang vật, phương tiện và khám phương tiện vận tải theo thủ tục hành chính."},{"front":"Câu 48: Theo quy định pháp luật hiện hành, việc xử phạt vi phạm hành chính phải căn cứ vào:","back":"✅ Đáp án: B. Tính chất, mức độ, hậu quả vi phạm và đối tượng thực hiện hành vi vi phạm hành chính."},{"front":"Câu 49: Theo quy định của Luật Xử lý vi phạm hành chính hiện hành, trường hợp nào sau đây được xác định là tình tiết giảm nhẹ?","back":"✅ Đáp án: C. Tự nguyện khai báo, thành thật hối lỗi và tích cực giúp đỡ cơ quan chức năng xử lý vi phạm."},{"front":"Câu 50: Theo Luật Xử lý vi phạm hành chính, tổ chức vi phạm hành chính bị phạt tiền:","back":"✅ Đáp án: B. Với mức tiền phạt gấp hai lần mức tiền phạt áp dụng đối với cá nhân cùng thực hiện hành vi."},{"front":"Câu 51: Theo quy định pháp luật hiện hành, thời hạn tạm giữ tang vật, phương tiện vi phạm hành chính là:","back":"✅ Đáp án: A. Không quá bảy ngày kể từ ngày tạm giữ, trừ trường hợp pháp luật có quy định khác."},{"front":"Câu 52: Trong quá trình kiểm tra cơ sở kinh doanh, đoàn kiểm tra phát hiện bà B đang buôn bán hàng hóa nhập lậu. Do cần xác minh tình tiết liên quan đến tang vật vi phạm, người có thẩm quyền quyết định tạm giữ số hàng hóa này. Việc tạm giữ tang vật trong trường hợp trên nhằm:","back":"✅ Đáp án: B. Bảo đảm xác minh tình tiết và xử lý vi phạm hành chính."},{"front":"Câu 53: Theo Luật Cán bộ, công chức năm 2025, cán bộ là:","back":"✅ Đáp án: B. Công dân Việt Nam được bầu cử, phê chuẩn, bổ nhiệm giữ chức vụ, chức danh theo nhiệm kỳ trong cơ quan của Đảng, Nhà nước và tổ chức chính trị - xã hội."},{"front":"Câu 54: Theo Luật Cán bộ, công chức năm 2025, công chức là:","back":"✅ Đáp án: A. Công dân Việt Nam được tuyển dụng vào vị trí việc làm trong cơ quan của Đảng, Nhà nước, tổ chức chính trị - xã hội và hưởng lương từ ngân sách nhà nước."},{"front":"Câu 55: Theo Luật Cán bộ, công chức năm 2025, một trong các nguyên tắc trong thi hành công vụ là gì?","back":"✅ Đáp án: A. Bảo vệ lợi ích của Nhà nước, quyền, lợi ích hợp pháp của tổ chức, công dân."},{"front":"Câu 56: Theo Luật Cán bộ, công chức năm 2025, cán bộ, công chức có quyền nào sau đây?","back":"✅ Đáp án: D. Được cung cấp thông tin, dữ liệu liên quan đến nhiệm vụ, quyền hạn được giao."},{"front":"Câu 57: Theo Luật Cán bộ, công chức năm 2025, việc tuyển dụng công chức phải căn cứ vào:","back":"✅ Đáp án: A. Nhu cầu nhiệm vụ, vị trí việc làm và chỉ tiêu biên chế theo quy định của pháp luật hiện hành."},{"front":"Câu 58: Theo Luật Cán bộ, công chức năm 2025, hình thức kỷ luật đối với công chức không giữ chức vụ lãnh đạo, quản lý gồm:","back":"✅ Đáp án: A. Khiển trách, cảnh cáo, hạ bậc lương, buộc thôi việc theo quy định của pháp luật hiện hành."},{"front":"Câu 59: Theo Luật Viên chức năm 2025, viên chức là:","back":"✅ Đáp án: A. Công dân Việt Nam được tuyển dụng theo vị trí việc làm, làm việc tại đơn vị sự nghiệp công lập theo chế độ hợp đồng làm việc và hưởng lương từ quỹ lương của đơn vị sự nghiệp công lập theo quy định pháp luật."},{"front":"Câu 60: Theo Luật Viên chức năm 2025, tuyển dụng viên chức phải căn cứ vào:","back":"✅ Đáp án: A. Nhu cầu công việc, vị trí việc làm, tiêu chuẩn chức danh nghề nghiệp và quỹ tiền lương của đơn vị sự nghiệp công lập."},{"front":"Câu 61: Theo quy định của pháp luật hiện hành, điểm khác nhau cơ bản giữa cán bộ và công chức là:","back":"✅ Đáp án: A. Cán bộ được bầu cử, phê chuẩn hoặc bổ nhiệm theo nhiệm kỳ; công chức được tuyển dụng, bổ nhiệm vào ngạch, chức vụ, chức danh theo quy định pháp luật."},{"front":"Câu 62: Theo quy định pháp luật hiện hành, viên chức khác công chức ở điểm nào sau đây?","back":"✅ Đáp án: B. Viên chức làm việc theo chế độ hợp đồng làm việc tại đơn vị sự nghiệp công lập, còn công chức được tuyển dụng vào cơ quan của Đảng, Nhà nước, tổ chức chính trị - xã hội."},{"front":"Câu 63: Theo quy định của pháp luật hiện hành, chủ thể nào sau đây làm việc theo chế độ hợp đồng làm việc?","back":"✅ Đáp án: C. Viên chức được tuyển dụng vào đơn vị sự nghiệp công lập theo quy định của pháp luật về viên chức."},{"front":"Câu 64: Theo Luật Khiếu nại, khiếu nại được hiểu là:","back":"✅ Đáp án: B. Công dân, cơ quan, tổ chức hoặc cán bộ, công chức theo thủ tục đề nghị cơ quan, tổ chức, cá nhân có thẩm quyền xem xét lại quyết định hành chính, hành vi hành chính của cơ quan hành chính nhà nước, của người có thẩm quyền trong cơ quan hành chính nhà nước hoặc quyết định kỷ luật cán bộ, công chức khi có căn cứ cho rằng quyết định hoặc hành vi đó là trái pháp luật, xâm phạm quyền, lợi ích hợp pháp của mình."},{"front":"Câu 65: Theo quy định của Luật Khiếu nại, người khiếu nại có quyền nào sau đây?","back":"✅ Đáp án: B. Khiếu nại, rút khiếu nại và cung cấp chứng cứ liên quan đến nội dung khiếu nại theo quy định pháp luật."},{"front":"Câu 66: Theo Luật Khiếu nại, cơ quan giải quyết khiếu nại có trách nhiệm nào sau đây?","back":"✅ Đáp án: A. Thụ lý, xác minh, đối thoại và ban hành quyết định giải quyết khiếu nại theo quy định pháp luật."},{"front":"Câu 67: Theo quy định pháp luật hiện hành, thời hiệu khiếu nại là bao nhiêu ngày?","back":"✅ Đáp án: A. Chín mươi ngày kể từ ngày người khiếu nại nhận được hoặc biết được quyết định hành chính, hành vi hành chính."},{"front":"Câu 68: Theo Luật Khiếu nại, việc giải quyết khiếu nại phải bảo đảm nguyên tắc nào sau đây?","back":"✅ Đáp án: B. Khách quan, công khai, dân chủ và đúng pháp luật trong quá trình giải quyết khiếu nại hành chính."},{"front":"Câu 69: Theo quy định của Luật Khiếu nại hiện hành, người khiếu nại có thể thực hiện việc khiếu nại thông qua chủ thể nào sau đây?","back":"✅ Đáp án: A. Người đại diện theo pháp luật hoặc người được ủy quyền hợp pháp."},{"front":"Câu 70: Theo Luật Khiếu nại, đối thoại trong giải quyết khiếu nại được thực hiện nhằm:","back":"✅ Đáp án: B. Làm rõ nội dung khiếu nại, yêu cầu của người khiếu nại và hướng giải quyết vụ việc khiếu nại."},{"front":"Câu 71: Ông M thực hiện hành vi vi phạm hành chính vào ngày 01/3/2024 nhưng đến ngày 20/4/2024 cơ quan có thẩm quyền mới phát hiện hành vi vi phạm này. Theo quy định của Luật Xử lý vi phạm hành chính, thời hiệu xử phạt vi phạm hành chính trong trường hợp thông thường được tính từ thời điểm nào?","back":"✅ Đáp án: C. Từ thời điểm hành vi vi phạm hành chính được thực hiện."},{"front":"Câu 72: Theo Luật Tố tụng hành chính, hành vi hành chính được hiểu là:","back":"✅ Đáp án: B. Hành vi của cơ quan, tổ chức hoặc người có thẩm quyền thực hiện hoặc không thực hiện nhiệm vụ, công vụ theo quy định pháp luật."},{"front":"Câu 73: Theo Luật Tố tụng hành chính, đối tượng giải quyết vụ án hành chính bao gồm:","back":"✅ Đáp án: A. Quyết định hành chính, hành vi hành chính; quyết định kỷ luật buộc thôi việc đối với công chức; quyết định giải quyết khiếu nại về quyết định xử lý vụ việc cạnh tranh."},{"front":"Câu 74: Theo Luật Tố tụng hành chính, người khởi kiện là:","back":"✅ Đáp án: A. Cá nhân, cơ quan, tổ chức khởi kiện vụ án hành chính để yêu cầu Tòa án bảo vệ quyền, lợi ích hợp pháp của mình."},{"front":"Câu 75: Theo Luật Tố tụng hành chính, chủ thể nào sau đây là người bị kiện trong vụ án hành chính?","back":"✅ Đáp án: B. Cơ quan, tổ chức hoặc cá nhân có quyết định hành chính, hành vi hành chính hoặc quyết định kỷ luật buộc thôi việc bị khởi kiện."},{"front":"Câu 76: Theo Luật Tố tụng hành chính, thời hiệu khởi kiện vụ án hành chính là bao lâu kể từ ngày người khởi kiện nhận được hoặc biết được quyết định hành chính, hành vi hành chính, quyết định kỷ luật buộc thôi việc hoặc quyết định giải quyết khiếu nại về quyết định xử lý vụ việc cạnh tranh?","back":"✅ Đáp án: B. 01 năm."},{"front":"Câu 77: Theo Luật Tố tụng hành chính, Tòa án xét xử vụ án hành chính phải bảo đảm nguyên tắc nào sau đây?","back":"✅ Đáp án: B. Thẩm phán và Hội thẩm xét xử độc lập và chỉ tuân theo pháp luật trong quá trình giải quyết vụ án."},{"front":"Câu 78: Theo Luật Tố tụng hành chính, đương sự trong vụ án hành chính gồm:","back":"✅ Đáp án: A. Người khởi kiện, người bị kiện và người có quyền lợi, nghĩa vụ liên quan trong vụ án hành chính."},{"front":"Câu 79: Theo Luật Tố tụng hành chính, chứng cứ trong vụ án hành chính được hiểu là những tài liệu nào?","back":"✅ Đáp án: B. Những gì có thật được đương sự, cơ quan, tổ chức, cá nhân giao nộp hoặc do Tòa án thu thập theo trình tự, thủ tục luật định và được dùng làm căn cứ để xác định tình tiết khách quan của vụ án."},{"front":"Câu 80: Theo Luật Tố tụng hành chính, việc xét xử sơ thẩm vụ án hành chính được tiến hành:","back":"✅ Đáp án: A. Công khai, trừ trường hợp cần giữ bí mật nhà nước, thuần phong mỹ tục hoặc bảo vệ người chưa thành niên."},{"front":"Câu 81: Theo Luật Tố tụng hành chính, Hội đồng xét xử sơ thẩm vụ án hành chính gồm:","back":"✅ Đáp án: C. Một Thẩm phán và hai Hội thẩm nhân dân, trừ trường hợp xét xử theo thủ tục rút gọn."},{"front":"Câu 82: Theo quy định của Luật Tố tụng hành chính, Tòa án trả lại đơn khởi kiện trong trường hợp nào sau đây?","back":"✅ Đáp án: A. Người khởi kiện không có quyền khởi kiện theo quy định của Luật Tố tụng hành chính hiện hành."},{"front":"Câu 83: Theo quy định của Luật Tố tụng hành chính hiện hành, đối thoại trong tố tụng hành chính nhằm:","back":"✅ Đáp án: A. Tạo điều kiện để đương sự thống nhất hướng giải quyết vụ án hành chính theo quy định pháp luật."},{"front":"Câu 84: Theo Luật Tố tụng hành chính, Viện kiểm sát nhân dân tham gia tố tụng hành chính nhằm:","back":"✅ Đáp án: A. Kiểm sát việc tuân theo pháp luật trong quá trình giải quyết vụ án hành chính của Tòa án."},{"front":"Câu 85: Theo quy định của Luật Tố tụng hành chính hiện hành, bản án sơ thẩm chưa có hiệu lực pháp luật khi:","back":"✅ Đáp án: B. Bị kháng cáo hoặc kháng nghị trong thời hạn luật định."},{"front":"Câu 86: Theo quy định của Luật Tố tụng hành chính hiện hành, người bảo vệ quyền và lợi ích hợp pháp của đương sự có thể là:","back":"✅ Đáp án: C. Luật sư hoặc người khác theo quy định của pháp luật tham gia tố tụng để bảo vệ đương sự."},{"front":"Câu 87: Theo Luật Tố tụng hành chính, người khởi kiện có quyền rút đơn khởi kiện vào thời điểm nào?","back":"✅ Đáp án: A. Trước khi Tòa án ra bản án hoặc quyết định giải quyết vụ án hành chính theo quy định pháp luật."},{"front":"Câu 88: Theo Luật Tố tụng hành chính, kháng cáo được hiểu là gì?","back":"✅ Đáp án: B. Là quyền của đương sự hoặc người đại diện hợp pháp yêu cầu Tòa án cấp trên trực tiếp xét xử lại bản án, quyết định sơ thẩm chưa có hiệu lực pháp luật."},{"front":"Câu 89: Theo Luật Tố tụng hành chính, người làm chứng có nghĩa vụ nào sau đây?","back":"✅ Đáp án: B. Khai báo trung thực những tình tiết mà mình biết liên quan đến vụ án hành chính được giải quyết."},{"front":"Câu 90: Theo Luật Tố tụng hành chính, Tòa án quyết định tạm đình chỉ giải quyết vụ án hành chính khi:","back":"✅ Đáp án: D. Có căn cứ theo quy định của pháp luật làm cho việc giải quyết vụ án chưa thể tiếp tục và thuộc trường hợp phải tạm đình chỉ giải quyết vụ án."},{"front":"Câu 91: Theo Luật Tố tụng hành chính, bản án, quyết định của Tòa án đã có hiệu lực pháp luật phải được:","back":"✅ Đáp án: A. Cơ quan, tổ chức, cá nhân có liên quan nghiêm chỉnh chấp hành theo quy định của pháp luật."},{"front":"Câu 92: Theo Luật Tố tụng hành chính, người tiến hành tố tụng gồm:","back":"✅ Đáp án: C. Thẩm phán, Hội thẩm, Thư ký Tòa án và Kiểm sát viên theo quy định của pháp luật hiện hành."},{"front":"Câu 93: Theo quy định của Luật Tố tụng hành chính hiện hành, Tòa án cấp phúc thẩm có quyền nào sau đây?","back":"✅ Đáp án: B. Giữ nguyên, sửa đổi hoặc hủy bản án sơ thẩm nhưng không được đình chỉ giải quyết vụ án ở giai đoạn phúc thẩm."},{"front":"Câu 94: Theo quy định của Luật Tố tụng hành chính hiện hành, người bị kiện có nghĩa vụ:","back":"✅ Đáp án: D. Cung cấp tài liệu, chứng cứ và tham gia tố tụng theo yêu cầu của Tòa án có thẩm quyền."},{"front":"Câu 95: Theo quy định của Luật Tố tụng hành chính hiện hành, đương sự có quyền đề nghị thay đổi người tiến hành tố tụng khi:","back":"✅ Đáp án: B. Có căn cứ cho rằng người đó có thể không vô tư, khách quan trong khi thực hiện nhiệm vụ tố tụng."},{"front":"Câu 96: Theo quy định của Luật Tố tụng hành chính hiện hành, nhiệm vụ của Luật Tố tụng hành chính là:","back":"✅ Đáp án: C. Bảo vệ công lý, quyền con người, quyền công dân, quyền và lợi ích hợp pháp của cơ quan, tổ chức, cá nhân."},{"front":"Câu 97: Tính hợp pháp của quyết định hành chính được hiểu như thế nào?","back":"✅ Đáp án: B. Quyết định hành chính phải được ban hành đúng thẩm quyền, trình tự, thủ tục và phù hợp quy định pháp luật."},{"front":"Câu 98: Ông H xây dựng công trình không có giấy phép xây dựng theo quy định và bị xử phạt vi phạm hành chính, đồng thời bị áp dụng biện pháp khắc phục hậu quả là buộc tháo dỡ công trình vi phạm. Hết thời hạn thi hành quyết định xử phạt, ông H vẫn không tự nguyện chấp hành nên Chủ tịch UBND xã ban hành quyết định cưỡng chế tháo dỡ công trình. Biện pháp cưỡng chế trong trường hợp này nhằm:","back":"✅ Đáp án: B. Buộc cá nhân vi phạm thực hiện biện pháp khắc phục hậu quả."},{"front":"Câu 99: Quyết định hành chính không bảo đảm tính hợp pháp khi:","back":"✅ Đáp án: C. Quyết định được ban hành bởi chủ thể không có thẩm quyền hoặc vượt quá phạm vi thẩm quyền theo quy định của pháp luật."},{"front":"Câu 100: Quyết định hành chính không bảo đảm tính hợp lý khi:","back":"✅ Đáp án: A. Nội dung quyết định phù hợp quy định pháp luật nhưng không phù hợp với điều kiện thực tế."}]};

// ===== 2. ID GENERATION =====
const IdGen = {
  _rand: () => Math.random().toString(36).substring(2, 8),

  deckId() {
    return 'd_' + Date.now().toString(36) + '_' + this._rand();
  },

  cardId() {
    return 'c_' + Date.now().toString(36) + '_' + this._rand();
  }
};

// ===== 3. STORE — localStorage persistence =====
const Store = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data && typeof data === 'object' && data.version) {
        return data;
      }
      // Corrupted — try backup
      console.warn('Primary storage corrupted, trying backup');
      return this._loadBackup();
    } catch (e) {
      console.error('Failed to load storage:', e);
      return this._loadBackup();
    }
  },

  _loadBackup() {
    try {
      const raw = localStorage.getItem(BACKUP_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data && typeof data === 'object' && data.version) return data;
    } catch (_) { /* ignore */ }
    return null;
  },

  save(data) {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, json);
      // Keep a backup copy
      try { localStorage.setItem(BACKUP_KEY, json); } catch (_) { /* best effort */ }
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        Store._handleQuotaError();
      } else {
        throw e;
      }
    }
  },

  init() {
    const existing = this.load();
    if (existing) return existing;
    // Fresh start
    const defaultState = {
      version: APP_VERSION,
      decks: [],
      cards: {},
      stats: {
        totalReviews: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: null,
        dailyLogs: {}
      },
      settings: {
        theme: 'light',
        newCardsPerDay: 20,
        reviewsPerDay: 100
      }
    };
    this.save(defaultState);
    return defaultState;
  },

  exportJSON(state) {
    return JSON.stringify(state, null, 2);
  },

  exportCSV(state, deckId) {
    const deck = state.decks.find(d => d.id === deckId);
    if (!deck) return '';
    const lines = ['"front","back"'];
    for (const cid of deck.cardIds) {
      const card = state.cards[cid];
      if (card) {
        const front = card.front.replace(/"/g, '""');
        const back = card.back.replace(/"/g, '""');
        lines.push(`"${front}","${back}"`);
      }
    }
    return lines.join('\n');
  },

  importJSON(state, jsonText) {
    let data;
    try {
      data = JSON.parse(jsonText);
    } catch (e) {
      return { success: false, error: 'Invalid JSON format: ' + e.message };
    }
    if (!data || typeof data !== 'object') {
      return { success: false, error: 'JSON must contain an object' };
    }
    // Import decks and cards
    if (Array.isArray(data.decks)) {
      for (const d of data.decks) {
        if (!d.name) {
          return { success: false, error: 'Each deck must have a "name" field' };
        }
        const existingIdx = state.decks.findIndex(e => e.id === d.id);
        const deck = {
          id: d.id || IdGen.deckId(),
          name: d.name,
          description: d.description || '',
          createdAt: d.createdAt || Date.now(),
          updatedAt: Date.now(),
          cardIds: []
        };
        if (existingIdx >= 0) {
          state.decks[existingIdx] = deck;
        } else {
          state.decks.push(deck);
        }
        // Import cards for this deck
        if (Array.isArray(d.cards)) {
          for (const c of d.cards) {
            if (!c.front || !c.back) {
              return { success: false, error: 'Each card must have "front" and "back" fields' };
            }
            const cardId = c.id || IdGen.cardId();
            state.cards[cardId] = {
              id: cardId,
              deckId: deck.id,
              front: c.front,
              back: c.back,
              createdAt: c.createdAt || Date.now(),
              sm2: c.sm2 || {
                easinessFactor: 2.5,
                interval: 0,
                repetitions: 0,
                nextReview: Date.now(),
                lastReview: null,
                quality: null
              }
            };
            deck.cardIds.push(cardId);
          }
        }
      }
    }
    if (data.settings) {
      Object.assign(state.settings, data.settings);
    }
    return { success: true };
  },

  importCSV(state, text, deckId) {
    const deck = state.decks.find(d => d.id === deckId);
    if (!deck) return { success: false, error: 'Deck not found' };

    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) {
      return { success: false, error: 'CSV must have a header row and at least one data row' };
    }

    let imported = 0;
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      // Parse CSV line (simple: split by comma respecting quotes)
      const parts = this._parseCSVLine(line);
      if (parts.length < 2) continue;
      const front = parts[0].trim();
      const back = parts[1].trim();
      if (!front || !back) continue;

      const cardId = IdGen.cardId();
      state.cards[cardId] = {
        id: cardId,
        deckId: deck.id,
        front,
        back,
        createdAt: Date.now(),
        sm2: {
          easinessFactor: 2.5,
          interval: 0,
          repetitions: 0,
          nextReview: Date.now(),
          lastReview: null,
          quality: null
        }
      };
      deck.cardIds.push(cardId);
      imported++;
    }
    deck.updatedAt = Date.now();
    return { success: true, count: imported };
  },

  _parseCSVLine(line) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        parts.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    parts.push(current);
    return parts;
  },

  getStorageUsage() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const val = localStorage.getItem(key);
      total += (key ? key.length : 0) + (val ? val.length : 0);
    }
    return total;
  },

  _handleQuotaError() {
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    title.textContent = '⚠️ Storage Full';
    body.innerHTML = `
      <p style="margin-bottom:16px;color:var(--text-secondary);">
        Your browser's local storage is full. Please export your data and reset, or delete some decks.
      </p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-primary" data-action="export-all">Export All Data</button>
        <button class="btn btn-danger" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>
      </div>
    `;
    modal.classList.remove('hidden');
  }
};

// ===== 4. SM-2 SPACED REPETITION ALGORITHM =====
const SM2 = {
  /**
   * Apply SM-2 algorithm given a quality rating (0-5).
   * Mutates card.sm2 in place.
   */
  apply(card, quality) {
    const q = Math.max(0, Math.min(5, Math.round(quality)));
    const sm2 = card.sm2;

    // Update easiness factor
    let ef = sm2.easinessFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (ef < 1.3) ef = 1.3;
    sm2.easinessFactor = Math.round(ef * 100) / 100;

    if (q < 3) {
      // Failed recall — reset
      sm2.repetitions = 0;
      sm2.interval = 1; // Review again tomorrow
      // For immediate retry in same session, set nextReview to 10 min
      sm2.nextReview = Date.now() + 10 * MS_PER_MIN;
    } else {
      // Successful recall
      const reps = sm2.repetitions;
      if (reps === 0) {
        sm2.interval = 1;
      } else if (reps === 1) {
        sm2.interval = 6;
      } else {
        sm2.interval = Math.round(sm2.interval * sm2.easinessFactor);
      }
      sm2.repetitions = reps + 1;
      sm2.nextReview = Date.now() + sm2.interval * MS_PER_DAY;
    }

    sm2.lastReview = Date.now();
    sm2.quality = q;

    return card;
  },

  isDue(card) {
    return card.sm2.nextReview <= Date.now();
  },

  getDueCards(deck, allCards) {
    if (!deck) return [];
    const due = [];
    for (const cid of deck.cardIds) {
      const card = allCards[cid];
      if (card && this.isDue(card)) {
        due.push(card);
      }
    }
    // Sort by nextReview (oldest first), then by repetitions (new cards first)
    due.sort((a, b) => {
      if (a.sm2.nextReview !== b.sm2.nextReview) {
        return a.sm2.nextReview - b.sm2.nextReview;
      }
      return a.sm2.repetitions - b.sm2.repetitions;
    });
    return due;
  },

  getNewCards(deck, allCards) {
    if (!deck) return [];
    const newCards = [];
    for (const cid of deck.cardIds) {
      const card = allCards[cid];
      if (card && card.sm2.repetitions === 0 && card.sm2.quality === null) {
        newCards.push(card);
      }
    }
    return newCards;
  }
};

// ===== 5. STATE MANAGEMENT =====
const State = {
  _data: null,

  init() {
    this._data = Store.init();
    // Apply theme
    this._applyTheme();
    // Run integrity check
    this._integrityCheck();
    return this._data;
  },

  getState() {
    // Re-read from store for multi-tab sync awareness
    // (but keep in-memory copy for performance, refreshed on storage event)
    return this._data;
  },

  _persist() {
    Store.save(this._data);
  },

  _applyTheme() {
    document.documentElement.setAttribute('data-theme', this._data.settings.theme || 'light');
  },

  _integrityCheck() {
    // Find orphaned cards and offer to recover
    const validDeckIds = new Set(this._data.decks.map(d => d.id));
    const orphaned = [];
    for (const [cid, card] of Object.entries(this._data.cards)) {
      if (!validDeckIds.has(card.deckId)) {
        orphaned.push(cid);
      }
    }
    if (orphaned.length > 0) {
      // Automatically clean up orphaned cards
      for (const cid of orphaned) {
        delete this._data.cards[cid];
      }
      this._persist();
    }
  },

  // ---- Deck CRUD ----

  getDeck(id) {
    return this._data.decks.find(d => d.id === id);
  },

  addDeck(name, description) {
    const deck = {
      id: IdGen.deckId(),
      name: name.trim(),
      description: (description || '').trim(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      cardIds: []
    };
    this._data.decks.push(deck);
    this._persist();
    return deck;
  },

  updateDeck(id, updates) {
    const deck = this.getDeck(id);
    if (!deck) return null;
    if (updates.name !== undefined) deck.name = updates.name.trim();
    if (updates.description !== undefined) deck.description = updates.description.trim();
    deck.updatedAt = Date.now();
    this._persist();
    return deck;
  },

  deleteDeck(id) {
    const idx = this._data.decks.findIndex(d => d.id === id);
    if (idx < 0) return false;
    const deck = this._data.decks[idx];
    // Remove all cards in the deck
    for (const cid of deck.cardIds) {
      delete this._data.cards[cid];
    }
    this._data.decks.splice(idx, 1);
    this._persist();
    return true;
  },

  // ---- Card CRUD ----

  getCard(id) {
    return this._data.cards[id] || null;
  },

  getCardsForDeck(deckId) {
    const deck = this.getDeck(deckId);
    if (!deck) return [];
    return deck.cardIds.map(cid => this._data.cards[cid]).filter(Boolean);
  },

  addCard(deckId, front, back) {
    const deck = this.getDeck(deckId);
    if (!deck) return null;
    const cardId = IdGen.cardId();
    const card = {
      id: cardId,
      deckId: deck.id,
      front: front.trim(),
      back: back.trim(),
      createdAt: Date.now(),
      sm2: {
        easinessFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: Date.now(),
        lastReview: null,
        quality: null
      }
    };
    this._data.cards[cardId] = card;
    deck.cardIds.push(cardId);
    deck.updatedAt = Date.now();
    this._persist();
    return card;
  },

  updateCard(cardId, updates) {
    const card = this.getCard(cardId);
    if (!card) return null;
    if (updates.front !== undefined) card.front = updates.front.trim();
    if (updates.back !== undefined) card.back = updates.back.trim();
    this._persist();
    return card;
  },

  deleteCard(cardId) {
    const card = this.getCard(cardId);
    if (!card) return false;
    const deck = this.getDeck(card.deckId);
    if (deck) {
      const idx = deck.cardIds.indexOf(cardId);
      if (idx >= 0) deck.cardIds.splice(idx, 1);
      deck.updatedAt = Date.now();
    }
    delete this._data.cards[cardId];
    this._persist();
    return true;
  },

  // ---- Review Logging ----

  logReview(quality, isNew) {
    const today = this._getTodayStr();
    if (!this._data.stats.dailyLogs[today]) {
      this._data.stats.dailyLogs[today] = { newCards: 0, reviews: 0, correct: 0, incorrect: 0 };
    }
    const log = this._data.stats.dailyLogs[today];
    log.reviews++;
    if (quality >= 3) {
      log.correct++;
    } else {
      log.incorrect++;
    }
    if (isNew) log.newCards++;
    this._data.stats.totalReviews++;
    this._updateStreak(today);
    this._persist();
  },

  _getTodayStr() {
    const d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  },

  _updateStreak(today) {
    const last = this._data.stats.lastStudyDate;
    this._data.stats.lastStudyDate = today;

    if (!last) {
      this._data.stats.currentStreak = 1;
    } else {
      // Check if last study date was yesterday or today
      const lastDate = new Date(last + 'T00:00:00');
      const todayDate = new Date(today + 'T00:00:00');
      const diffDays = Math.round((todayDate - lastDate) / MS_PER_DAY);

      if (diffDays === 1) {
        this._data.stats.currentStreak++;
      } else if (diffDays > 1) {
        this._data.stats.currentStreak = 1;
      }
      // If diffDays === 0, same day — do nothing
    }

    if (this._data.stats.currentStreak > this._data.stats.longestStreak) {
      this._data.stats.longestStreak = this._data.stats.currentStreak;
    }
  },

  getTodayStats() {
    const today = this._getTodayStr();
    const log = this._data.stats.dailyLogs[today];
    if (!log) return { reviews: 0, correct: 0, incorrect: 0, newCards: 0, total: 0 };
    return {
      ...log,
      total: log.correct + log.incorrect
    };
  },

  getStreak() {
    return {
      current: this._data.stats.currentStreak,
      longest: this._data.stats.longestStreak
    };
  },

  getDueCount() {
    let count = 0;
    for (const card of Object.values(this._data.cards)) {
      if (SM2.isDue(card)) count++;
    }
    return count;
  },

  getCardCounts(deckId) {
    const deck = this.getDeck(deckId);
    if (!deck) return { total: 0, due: 0, new: 0 };
    let total = 0, due = 0, newCards = 0;
    for (const cid of deck.cardIds) {
      const card = this._data.cards[cid];
      if (!card) continue;
      total++;
      if (SM2.isDue(card)) due++;
      if (card.sm2.repetitions === 0 && card.sm2.quality === null) newCards++;
    }
    return { total, due, new: newCards };
  },

  generateActivityData(days) {
    const result = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
      const log = this._data.stats.dailyLogs[key];
      result.push({
        date: key,
        studied: !!log && log.reviews > 0,
        count: log ? log.reviews : 0
      });
    }
    return result;
  },

  updateSettings(updates) {
    Object.assign(this._data.settings, updates);
    if (updates.theme) this._applyTheme();
    this._persist();
  },

  resetAllData() {
    this._data = {
      version: APP_VERSION,
      decks: [],
      cards: {},
      stats: {
        totalReviews: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: null,
        dailyLogs: {}
      },
      settings: {
        theme: 'light',
        newCardsPerDay: 20,
        reviewsPerDay: 100
      }
    };
    this._persist();
    this._applyTheme();
  }
};

// ===== 6. VIEWS — Render functions =====

const Views = {
  _escape(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  _formatDate(ts) {
    if (!ts) return 'Never';
    const d = new Date(ts);
    const now = new Date();
    const diff = now - d;
    if (diff < MS_PER_MIN) return 'Just now';
    if (diff < MS_PER_MIN * 60) return Math.floor(diff / MS_PER_MIN) + 'm ago';
    if (diff < MS_PER_DAY) return Math.floor(diff / (MS_PER_MIN * 60)) + 'h ago';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  },

  _qualityLabel(q) {
    const labels = ['Blackout', 'Wrong, familiar', 'Wrong, easy', 'Hard', 'Hesitated', 'Perfect'];
    return labels[q] || '';
  },

  _qualityBtnClass(q) {
    return 'r' + q;
  },

  // ---- Deck List ----
  renderDeckList(state) {
    if (state.decks.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">📚</div>
          <h2>No decks yet</h2>
          <p>Create your first flashcard deck to get started.</p>
          <button class="btn btn-primary" data-action="create-deck">+ Create Your First Deck</button>
        </div>
      `;
    }

    let html = `
      <div class="page-header">
        <div>
          <h1>My Decks</h1>
          <p>${this._getTotalDueText(state)}</p>
        </div>
        <button class="btn btn-primary" data-action="create-deck">+ New Deck</button>
      </div>
      <div class="deck-grid">
    `;

    for (const deck of state.decks) {
      const counts = State.getCardCounts(deck.id);
      const desc = deck.description || 'No description';
      html += `
        <div class="deck-card" data-action="view-deck" data-deck-id="${deck.id}">
          <h3>${this._escape(deck.name)}</h3>
          <p>${this._escape(desc)}</p>
          <div class="deck-meta">
            <span>${counts.total} cards</span>
            ${counts.due > 0 ? `<span class="deck-badge due">${counts.due} due</span>` : ''}
            ${counts.new > 0 ? `<span class="deck-badge new-card">${counts.new} new</span>` : ''}
          </div>
          <div class="deck-actions">
            <button class="btn btn-sm btn-success" data-action="start-quiz" data-deck-id="${deck.id}"
              ${counts.due === 0 ? 'disabled' : ''}>
              ▶ Study
            </button>
            <button class="btn btn-sm btn-secondary" data-action="edit-deck" data-deck-id="${deck.id}">Edit</button>
            <button class="btn btn-sm btn-danger" data-action="delete-deck" data-deck-id="${deck.id}">Delete</button>
          </div>
        </div>
      `;
    }

    html += '</div>';
    return html;
  },

  _deckImported(state) {
    return state.decks.some(d => d.name === PRESET_DECK_NAME);
  },

  _getTotalDueText(state) {
    const due = State.getDueCount();
    if (due === 0) return 'All caught up! 🎉';
    return `${due} card${due !== 1 ? 's' : ''} to review today`;
  },

  // ---- Deck View ----
  renderDeckView(state, deckId) {
    const deck = State.getDeck(deckId);
    if (!deck) {
      return `<div class="empty-state"><h2>Deck not found</h2><p><a href="#decks">← Back to decks</a></p></div>`;
    }

    const cards = State.getCardsForDeck(deckId);
    const counts = State.getCardCounts(deckId);

    let html = `
      <div class="page-header">
        <div>
          <a href="#decks" class="back-link" style="font-size:0.85rem;color:var(--text-secondary);">← All Decks</a>
          <h1>${this._escape(deck.name)}</h1>
          <p>${deck.description ? this._escape(deck.description) : ''}</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-success" data-action="start-quiz" data-deck-id="${deck.id}"
            ${counts.due === 0 ? 'disabled' : ''}>▶ Study (${counts.due})</button>
          <button class="btn btn-primary" data-action="add-card" data-deck-id="${deck.id}">+ Add Card</button>
        </div>
      </div>
      <div style="display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap;">
        <span style="font-size:0.9rem;color:var(--text-secondary);">📊 ${counts.total} total · ${counts.due} due · ${counts.new} new</span>
        <button class="btn btn-sm btn-secondary" data-action="import-csv" data-deck-id="${deck.id}">📥 Import CSV</button>
        <button class="btn btn-sm btn-secondary" data-action="export-csv" data-deck-id="${deck.id}">📤 Export CSV</button>
      </div>
    `;

    if (cards.length === 0) {
      html += `
        <div class="empty-state">
          <div class="empty-icon">🃏</div>
          <h2>No cards yet</h2>
          <p>Add your first flashcard to start studying.</p>
          <button class="btn btn-primary" data-action="add-card" data-deck-id="${deck.id}">+ Add Your First Card</button>
        </div>
      `;
    } else {
      html += `<div class="card-list">`;
      for (const card of cards) {
        const nextReview = card.sm2.lastReview
          ? (SM2.isDue(card) ? '<span style="color:var(--danger);font-weight:600;">Due now</span>'
              : 'Next: ' + this._formatDate(card.sm2.nextReview))
          : 'New card';
        const qualityStr = card.sm2.quality !== null
          ? `${card.sm2.quality}/5 · EF: ${card.sm2.easinessFactor}`
          : 'Not reviewed';

        html += `
          <div class="card-item">
            <div class="card-texts">
              <div class="card-front">${this._escape(card.front)}</div>
              <div class="card-back">${this._escape(card.back)}</div>
            </div>
            <div class="card-info">
              <span>${qualityStr}</span>
              <span>${nextReview}</span>
            </div>
            <div class="card-actions">
              <button class="btn btn-sm btn-secondary" data-action="edit-card" data-card-id="${card.id}">✏️</button>
              <button class="btn btn-sm btn-danger" data-action="delete-card" data-card-id="${card.id}">🗑️</button>
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }

    return html;
  },

  // ---- Quiz ----
  renderPreQuiz(state, deckId) {
    const deck = State.getDeck(deckId);
    if (!deck) {
      return `<div class="empty-state"><h2>Deck not found</h2></div>`;
    }

    const dueCards = SM2.getDueCards(deck, state.cards);
    if (dueCards.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <h2>All caught up!</h2>
          <p>No cards to review in "${this._escape(deck.name)}". Come back later!</p>
          <a href="#deck?id=${deckId}" class="btn btn-secondary">← Back to Deck</a>
        </div>
      `;
    }

    const counts = State.getCardCounts(deckId);
    return `
      <div class="quiz-container">
        <div class="page-header" style="justify-content:center;text-align:center;">
          <div>
            <h1>📝 ${this._escape(deck.name)}</h1>
            <p>${dueCards.length} card${dueCards.length !== 1 ? 's' : ''} to review today</p>
          </div>
        </div>
        <div style="text-align:center;margin-bottom:24px;">
          <p style="color:var(--text-secondary);font-size:0.9rem;">
            ${counts.new > 0 ? counts.new + ' new cards available · ' : ''}
            ${dueCards.length - counts.new} reviews due
          </p>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button class="btn btn-primary btn-lg" data-action="start-session" data-deck-id="${deckId}">
            ▶ Start Quiz
          </button>
          <a href="#deck?id=${deckId}" class="btn btn-secondary">Back</a>
        </div>
      </div>
    `;
  },

  // Quiz session state (in-memory only)
  _session: null,

  initSession(deckId) {
    const state = State.getState();
    const deck = State.getDeck(deckId);
    const dueCards = SM2.getDueCards(deck, state.cards);
    this._session = {
      deckId,
      cards: dueCards,
      currentIndex: 0,
      flipped: false,
      startTime: Date.now(),
      results: [] // { cardId, quality, isNew }
    };
  },

  renderQuizCard() {
    const sess = this._session;
    if (!sess || sess.currentIndex >= sess.cards.length) {
      return this.renderSessionComplete();
    }

    const card = sess.cards[sess.currentIndex];
    const total = sess.cards.length;
    const current = sess.currentIndex + 1;
    const progress = Math.round((current / total) * 100);

    return `
      <div class="quiz-container">
        <div class="quiz-progress">
          Card ${current} of ${total}
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width:${progress}%"></div>
          </div>
        </div>

        <div class="flashcard ${sess.flipped ? 'flipped' : ''}" id="quiz-card">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <div class="card-label">Front</div>
              <div class="card-content">${this._escape(card.front)}</div>
            </div>
            <div class="flashcard-back">
              <div class="card-label">Back</div>
              <div class="card-content">${this._escape(card.back)}</div>
            </div>
          </div>
        </div>

        ${!sess.flipped ? `
          <div class="quiz-actions">
            <button class="btn btn-primary" data-action="flip-card">Show Answer</button>
          </div>
        ` : `
          <div style="text-align:center;margin-bottom:8px;">
            <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">
              How well did you remember?
            </p>
            <div class="rating-row">
              ${[0,1,2,3,4,5].map(q => `
                <button class="rating-btn ${this._qualityBtnClass(q)}"
                        data-action="rate-card" data-quality="${q}"
                        title="${this._qualityLabel(q)}">
                  <span class="rating-num">${q}</span>
                  <span class="rating-label">${this._qualityLabel(q).split(',')[0]}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `}
      </div>
    `;
  },

  renderSessionComplete() {
    const sess = this._session;
    if (!sess) return '';

    const correct = sess.results.filter(r => r.quality >= 3).length;
    const total = sess.results.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const elapsed = Math.round((Date.now() - sess.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    let grade = '';
    let emoji = '';
    if (pct >= 90) { grade = 'Excellent!'; emoji = '🏆'; }
    else if (pct >= 70) { grade = 'Great job!'; emoji = '🎉'; }
    else if (pct >= 50) { grade = 'Keep practicing!'; emoji = '💪'; }
    else { grade = 'Study more!'; emoji = '📖'; }

    return `
      <div class="quiz-container">
        <div class="session-summary">
          <div style="font-size:3rem;margin-bottom:8px;">${emoji}</div>
          <h2>${grade}</h2>
          <p style="color:var(--text-secondary);margin-bottom:8px;">Session complete</p>
          <div class="big-number">${pct}%</div>
          <p style="color:var(--text-secondary);font-size:0.9rem;">${correct}/${total} correct</p>

          <div class="session-stats">
            <div class="session-stat">
              <div class="stat-value" style="color:var(--success);">${correct}</div>
              <div class="stat-label">Correct</div>
            </div>
            <div class="session-stat">
              <div class="stat-value" style="color:var(--danger);">${total - correct}</div>
              <div class="stat-label">Incorrect</div>
            </div>
            <div class="session-stat">
              <div class="stat-value">${mins}:${String(secs).padStart(2, '0')}</div>
              <div class="stat-label">Duration</div>
            </div>
          </div>

          <div class="session-actions">
            <button class="btn btn-primary" data-action="start-session" data-deck-id="${sess.deckId}">🔄 Study Again</button>
            <a href="#deck?id=${sess.deckId}" class="btn btn-secondary">← Deck</a>
            <a href="#decks" class="btn btn-secondary">All Decks</a>
          </div>
        </div>
      </div>
    `;
  },

  // ---- Stats Dashboard ----
  renderStats(state) {
    const today = State.getTodayStats();
    const streak = State.getStreak();
    const dueCount = State.getDueCount();
    const totalCards = Object.keys(state.cards).length;
    const mastered = Object.values(state.cards).filter(c => c.sm2.interval >= 21).length;
    const activity = State.generateActivityData(49); // 7 weeks

    if (state.stats.totalReviews === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <h2>No stats yet</h2>
          <p>Start studying to see your progress and activity!</p>
          <a href="#decks" class="btn btn-primary">Go to Decks</a>
        </div>
      `;
    }

    return `
      <div class="page-header">
        <h1>📊 Your Progress</h1>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${today.reviews}</div>
          <div class="stat-label">Reviewed Today</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${today.reviews > 0 ? Math.round((today.correct / (today.correct + today.incorrect || 1)) * 100) : 0}%</div>
          <div class="stat-label">Today's Accuracy</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--success);">${streak.current}</div>
          <div class="stat-label">Current Streak (days)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--warning);">${streak.longest}</div>
          <div class="stat-label">Longest Streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${state.stats.totalReviews}</div>
          <div class="stat-label">Total Reviews</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${totalCards}</div>
          <div class="stat-label">Total Cards</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--accent);">${mastered}</div>
          <div class="stat-label">Mastered (≥21d)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--danger);">${dueCount}</div>
          <div class="stat-label">Due Today</div>
        </div>
      </div>

      <div class="activity-calendar">
        <h3>📅 Activity (last 7 weeks)</h3>
        <div style="overflow-x:auto;">
          <div class="calendar-grid">
            ${['Mon','','Wed','','Fri','','Sun'].map(d =>
              `<div class="calendar-day-label">${d}</div>`
            ).join('')}
            ${activity.map(a => a.future ? '<div class="calendar-day future"></div>' : `
              <div class="calendar-day ${a.studied ? 'active' : 'empty'}"
                   title="${a.date}: ${a.count} reviews">
                ${a.studied ? '✓' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div style="margin-top:24px;">
        <button class="btn btn-sm btn-secondary" data-action="export-all">📤 Export All Data</button>
      </div>
    `;
  },

  // ---- Settings ----
  renderSettings(state) {
    const s = state.settings;
    return `
      <div class="page-header">
        <h1>⚙️ Settings</h1>
      </div>

      <div class="settings-section">
        <h3>Appearance</h3>
        <div class="setting-row">
          <div class="setting-label">
            <strong>Dark Mode</strong>
            <span>Switch between light and dark theme</span>
          </div>
          <div class="setting-control">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
              <input type="checkbox" id="theme-checkbox" ${s.theme === 'dark' ? 'checked' : ''}
                     data-action="toggle-theme-setting">
              <span>${s.theme === 'dark' ? '🌙 Dark' : '☀️ Light'}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3>Study Limits</h3>
        <div class="setting-row">
          <div class="setting-label">
            <strong>New Cards Per Day</strong>
            <span>Maximum number of new cards to introduce each day</span>
          </div>
          <div class="setting-control">
            <input type="number" class="form-input" style="width:80px;text-align:center;"
                   id="setting-new-cards" value="${s.newCardsPerDay}" min="1" max="200"
                   data-action="update-setting" data-setting="newCardsPerDay">
          </div>
        </div>
        <div class="setting-row">
          <div class="setting-label">
            <strong>Reviews Per Day</strong>
            <span>Maximum number of review cards per day</span>
          </div>
          <div class="setting-control">
            <input type="number" class="form-input" style="width:80px;text-align:center;"
                   id="setting-reviews" value="${s.reviewsPerDay}" min="1" max="500"
                   data-action="update-setting" data-setting="reviewsPerDay">
          </div>
        </div>
      </div>

      <div class="settings-section" style="border:2px solid var(--accent);background:var(--accent-light);">
        <h3>💾 Data Management — Move Your Progress</h3>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:16px;">
          Extract your data to a file, then import it on another device (phone, laptop, etc.) to continue exactly where you left off.
          <strong>All your learning progress, streaks, and stats are preserved.</strong>
        </p>
        <div class="setting-row">
          <div class="setting-label">
            <strong>📤 Extract My Data</strong>
            <span>Download EVERYTHING (decks, cards, progress, streaks) as a backup file. Use this when switching devices or creating a backup.</span>
          </div>
          <div class="setting-control">
            <button class="btn btn-primary" data-action="export-all">📤 Extract Data</button>
          </div>
        </div>
        <div class="setting-row">
          <div class="setting-label">
            <strong>📥 Import My Data</strong>
            <span>Upload a previously extracted backup file to restore all your decks, cards, and learning progress.</span>
          </div>
          <div class="setting-control">
            <div class="file-input-wrapper">
              <button class="btn btn-success">📥 Import Data</button>
              <input type="file" accept=".json" data-action="import-json">
            </div>
          </div>
        </div>
        <p style="font-size:0.78rem;color:var(--text-muted);margin-top:12px;">
          💡 <strong>Tip:</strong> On your phone, tap "Extract Data" → save the file → send it to another device → tap "Import Data" there to pick up right where you left off.
        </p>
      </div>

      <div class="settings-section">
        <h3>Danger Zone</h3>
        <div class="setting-row">
          <div class="setting-label">
            <strong>Reset All Data</strong>
            <span>Delete all decks, cards, and progress. This cannot be undone.</span>
          </div>
          <div class="setting-control">
            <button class="btn btn-sm btn-danger" data-action="reset-all">🗑️ Reset</button>
          </div>
        </div>
      </div>

      <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:0.8rem;">
        Flashcard Quiz App v${APP_VERSION} · Data stored in browser localStorage
      </div>
    `;
  }
};

// ===== 7. ROUTER AND EVENT HANDLERS =====

const Router = {
  init() {
    // Handle hash changes
    window.addEventListener('hashchange', () => this.navigate());
    // Handle storage events (multi-tab sync)
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        // Another tab modified data — reload state and re-render
        const state = Store.load();
        if (state) {
          State._data = state;
          State._applyTheme();
          this.navigate();
        }
      }
    });
    // Initial navigation
    this.navigate();
  },

  navigate() {
    const hash = window.location.hash.slice(1) || 'decks';
    const [page, queryString] = hash.split('?');
    const params = {};
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        params[k] = decodeURIComponent(v || '');
      });
    }

    const state = State.getState();
    const content = document.getElementById('main-content');
    let html = '';

    // Update nav active state
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });

    // Clean up any quiz session if leaving quiz page
    if (page !== 'quiz' && page !== 'deck') {
      // Keep session if returning to deck
    }
    if (page !== 'quiz') {
      Views._session = null;
    }

    try {
      switch (page) {
        case 'decks':
          html = Views.renderDeckList(state);
          break;
        case 'deck':
          html = Views.renderDeckView(state, params.id);
          break;
        case 'quiz':
          html = Views.renderPreQuiz(state, params.id);
          break;
        case 'stats':
          html = Views.renderStats(state);
          break;
        case 'settings':
          html = Views.renderSettings(state);
          break;
        default:
          html = Views.renderDeckList(state);
      }
    } catch (e) {
      console.error('Render error:', e);
      html = `<div class="empty-state"><h2>Something went wrong</h2><p>${Views._escape(e.message)}</p>
        <button class="btn btn-primary" onclick="location.hash='decks'">Go to Decks</button></div>`;
    }

    content.innerHTML = html;
    this._attachHandlers();
  },

  _attachHandlers() {
    // Handlers are attached once to document.body (never duplicated)
    if (this._handlersAttached) return;
    this._handlersAttached = true;

    // ---- Global click delegation on body (covers main-content AND modals) ----
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const deckId = btn.dataset.deckId;
      const cardId = btn.dataset.cardId;
      const quality = btn.dataset.quality;

      switch (action) {
        // Decks
        case 'create-deck': this._showCreateDeckModal(); break;
        case 'view-deck': location.hash = 'deck?id=' + btn.dataset.deckId; break;
        case 'edit-deck': this._showEditDeckModal(btn.dataset.deckId); break;
        case 'delete-deck': this._confirmDeleteDeck(btn.dataset.deckId); break;

        // Cards
        case 'add-card': this._showAddCardModal(btn.dataset.deckId); break;
        case 'edit-card': this._showEditCardModal(btn.dataset.cardId); break;
        case 'delete-card': this._confirmDeleteCard(btn.dataset.cardId); break;

        // Quiz
        case 'start-session':
          // From pre-quiz screen — start the session
          Views.initSession(btn.dataset.deckId);
          {
            const content = document.getElementById('main-content');
            content.innerHTML = Views.renderQuizCard();
            Router._attachHandlers();
          }
          break;
        case 'start-quiz':
          // From deck card — skip pre-quiz, go directly into quiz
          Views.initSession(btn.dataset.deckId);
          {
            const content = document.getElementById('main-content');
            content.innerHTML = Views.renderQuizCard();
            Router._attachHandlers();
          }
          break;
        case 'flip-card':
          Views._session.flipped = true;
          const cardEl = document.getElementById('quiz-card');
          if (cardEl) {
            cardEl.classList.add('flipped');
            // Re-render to show rating buttons
            setTimeout(() => {
              document.getElementById('main-content').innerHTML = Views.renderQuizCard();
              Router._attachHandlers();
            }, 100);
          }
          break;
        case 'rate-card':
          this._handleRate(parseInt(quality));
          break;

        // Stats & Export
        case 'export-all': this._exportAllJSON(); break;
        case 'export-csv': this._exportDeckCSV(btn.dataset.deckId); break;
        case 'import-csv': this._showImportCSV(btn.dataset.deckId); break;
        case 'import-json': this._handleImportJSON(btn); break;
        case 'reset-all': this._confirmResetAll(); break;
        case 'toggle-theme': this._toggleTheme(); break;
        case 'toggle-theme-setting': this._toggleThemeFromSetting(btn); break;

        // Modal
        case 'modal-close': this._closeModal(); break;
        case 'confirm-yes': this._handleConfirmYes(); break;
        case 'confirm-no': this._closeModal(); break;

        // Settings
        case 'update-setting': this._updateNumberSetting(btn); break;

        // Import CSV confirm
        case 'import-preset': this._handleImportPreset(); break;
        case 'import-csv-confirm': this._doImportCSV(btn); break;
      }
    });

    // Input changes for settings (on body to cover modal content too)
    document.body.addEventListener('change', (e) => {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      if (el.dataset.action === 'toggle-theme-setting') {
        this._toggleThemeFromSetting(el);
      }
    });
  },

  // ---- Modal helpers ----

  _openModal(title, bodyHtml, extraClass) {
    const overlay = document.getElementById('modal-overlay');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHtml;
    overlay.classList.remove('hidden');
  },

  _closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    // Clear pending confirm
    delete this._pendingConfirm;
  },

  _showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
  },

  // ---- Deck Modals ----

  _showCreateDeckModal() {
    this._openModal('Create New Deck', `
      <div class="form-group">
        <label for="deck-name">Deck Name</label>
        <input type="text" class="form-input" id="deck-name" placeholder="e.g. Spanish Vocabulary" autofocus>
      </div>
      <div class="form-group">
        <label for="deck-desc">Description (optional)</label>
        <textarea class="form-textarea" id="deck-desc" placeholder="Brief description of this deck" rows="2"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" data-action="modal-close">Cancel</button>
        <button class="btn btn-primary" id="modal-submit-deck">Create Deck</button>
      </div>
    `);

    // Attach submit handler
    document.getElementById('modal-submit-deck').addEventListener('click', () => {
      const name = document.getElementById('deck-name').value.trim();
      if (!name) {
        this._showToast('Please enter a deck name');
        return;
      }
      State.addDeck(name, document.getElementById('deck-desc').value.trim());
      this._closeModal();
      this._showToast(`Deck "${name}" created!`);
      this.navigate();
    });

    // Enter key support
    document.getElementById('deck-name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('modal-submit-deck').click();
    });
    setTimeout(() => document.getElementById('deck-name').focus(), 100);
  },

  _showEditDeckModal(deckId) {
    const deck = State.getDeck(deckId);
    if (!deck) return;
    this._openModal('Edit Deck', `
      <div class="form-group">
        <label for="deck-name">Deck Name</label>
        <input type="text" class="form-input" id="deck-name" value="${Views._escape(deck.name)}" autofocus>
      </div>
      <div class="form-group">
        <label for="deck-desc">Description</label>
        <textarea class="form-textarea" id="deck-desc" rows="2">${Views._escape(deck.description)}</textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" data-action="modal-close">Cancel</button>
        <button class="btn btn-primary" id="modal-submit-deck">Save</button>
      </div>
    `);

    document.getElementById('modal-submit-deck').addEventListener('click', () => {
      const name = document.getElementById('deck-name').value.trim();
      if (!name) { this._showToast('Please enter a deck name'); return; }
      State.updateDeck(deckId, { name, description: document.getElementById('deck-desc').value.trim() });
      this._closeModal();
      this._showToast('Deck updated!');
      this.navigate();
    });
  },

  _confirmDeleteDeck(deckId) {
    const deck = State.getDeck(deckId);
    if (!deck) return;
    this._pendingConfirm = { action: 'delete-deck', deckId };
    this._openModal('Delete Deck', `
      <div class="confirm-body">
        <p>Are you sure you want to delete <strong>"${Views._escape(deck.name)}"</strong>?
        This will permanently remove the deck and all its cards.</p>
        <div class="confirm-actions">
          <button class="btn btn-secondary" data-action="confirm-no">Cancel</button>
          <button class="btn btn-danger" data-action="confirm-yes">Delete</button>
        </div>
      </div>
    `);
  },

  // ---- Card Modals ----

  _showAddCardModal(deckId) {
    this._openModal('Add Card', `
      <div class="form-group">
        <label for="card-front">Front (question)</label>
        <textarea class="form-textarea" id="card-front" placeholder="Enter the question or prompt" rows="2" autofocus></textarea>
      </div>
      <div class="form-group">
        <label for="card-back">Back (answer)</label>
        <textarea class="form-textarea" id="card-back" placeholder="Enter the answer" rows="3"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" data-action="modal-close">Cancel</button>
        <button class="btn btn-primary" id="modal-submit-card">Add Card</button>
      </div>
    `);

    document.getElementById('modal-submit-card').addEventListener('click', () => {
      const front = document.getElementById('card-front').value.trim();
      const back = document.getElementById('card-back').value.trim();
      if (!front) { this._showToast('Front cannot be empty'); return; }
      if (!back) { this._showToast('Back cannot be empty'); return; }
      State.addCard(deckId, front, back);
      this._closeModal();
      this._showToast('Card added!');
      this.navigate();
    });

    // Ctrl+Enter to submit
    document.getElementById('card-back').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        document.getElementById('modal-submit-card').click();
      }
    });
    setTimeout(() => document.getElementById('card-front').focus(), 100);
  },

  _showEditCardModal(cardId) {
    const card = State.getCard(cardId);
    if (!card) return;
    this._openModal('Edit Card', `
      <div class="form-group">
        <label for="card-front">Front (question)</label>
        <textarea class="form-textarea" id="card-front" rows="2" autofocus>${Views._escape(card.front)}</textarea>
      </div>
      <div class="form-group">
        <label for="card-back">Back (answer)</label>
        <textarea class="form-textarea" id="card-back" rows="3">${Views._escape(card.back)}</textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" data-action="modal-close">Cancel</button>
        <button class="btn btn-primary" id="modal-submit-card">Save</button>
      </div>
    `);

    document.getElementById('modal-submit-card').addEventListener('click', () => {
      const front = document.getElementById('card-front').value.trim();
      const back = document.getElementById('card-back').value.trim();
      if (!front) { this._showToast('Front cannot be empty'); return; }
      if (!back) { this._showToast('Back cannot be empty'); return; }
      State.updateCard(cardId, { front, back });
      this._closeModal();
      this._showToast('Card updated!');
      this.navigate();
    });
  },

  _confirmDeleteCard(cardId) {
    const card = State.getCard(cardId);
    if (!card) return;
    this._pendingConfirm = { action: 'delete-card', cardId };
    this._openModal('Delete Card', `
      <div class="confirm-body">
        <p>Are you sure you want to delete this card?</p>
        <p style="font-weight:600;font-size:1.1rem;">"${Views._escape(card.front)}"</p>
        <div class="confirm-actions">
          <button class="btn btn-secondary" data-action="confirm-no">Cancel</button>
          <button class="btn btn-danger" data-action="confirm-yes">Delete</button>
        </div>
      </div>
    `);
  },

  // ---- Confirm Handler ----
  _handleConfirmYes() {
    const pending = this._pendingConfirm;
    if (!pending) { this._closeModal(); return; }

    switch (pending.action) {
      case 'delete-deck':
        State.deleteDeck(pending.deckId);
        this._showToast('Deck deleted');
        this.navigate();
        break;
      case 'delete-card':
        State.deleteCard(pending.cardId);
        this._showToast('Card deleted');
        this.navigate();
        break;
      case 'reset-all':
        State.resetAllData();
        this._showToast('All data has been reset');
        this.navigate();
        break;
    }

    delete this._pendingConfirm;
    this._closeModal();
  },

  // ---- Quiz Handlers ----

  _handleRate(quality) {
    const sess = Views._session;
    if (!sess || sess.currentIndex >= sess.cards.length) return;

    const card = sess.cards[sess.currentIndex];
    const isNew = card.sm2.repetitions === 0 && card.sm2.quality === null;

    // Apply SM-2
    SM2.apply(card, quality);

    // Log review
    State.logReview(quality, isNew);

    // Store result
    sess.results.push({ cardId: card.id, quality, isNew });

    // Advance to next card
    sess.currentIndex++;
    sess.flipped = false;

    // Re-render
    const content = document.getElementById('main-content');
    if (sess.currentIndex >= sess.cards.length) {
      content.innerHTML = Views.renderSessionComplete();
    } else {
      content.innerHTML = Views.renderQuizCard();
    }
    Router._attachHandlers();
  },

  // ---- Theme ----

  _toggleTheme() {
    const state = State.getState();
    const newTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
    State.updateSettings({ theme: newTheme });
    // Update theme button text
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    this.navigate();
  },

  _toggleThemeFromSetting(el) {
    const checked = el.checked;
    const newTheme = checked ? 'dark' : 'light';
    State.updateSettings({ theme: newTheme });
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    // Update the label text next to the checkbox
    const label = el.closest('label');
    if (label) label.querySelector('span').textContent = newTheme === 'dark' ? '🌙 Dark' : '☀️ Light';
  },

  // ---- Export / Import ----

  _exportAllJSON() {
    const state = State.getState();
    const json = Store.exportJSON(state);
    this._downloadFile(json, 'flashcard-data.json', 'application/json');
    this._showToast('✅ Data extracted! Save this file — use it to restore progress on any device.');
  },

  _exportDeckCSV(deckId) {
    const state = State.getState();
    const deck = State.getDeck(deckId);
    if (!deck) return;
    const csv = Store.exportCSV(state, deckId);
    if (!csv) { this._showToast('No cards to export'); return; }
    this._downloadFile(csv, `${deck.name.replace(/[^a-z0-9]/gi, '_')}.csv`, 'text/csv');
    this._showToast('CSV exported!');
  },

  _downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  _handleImportJSON(inputEl) {
    const file = inputEl.files && inputEl.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        this._doImportJSON(e.target.result);
      } catch (err) {
        this._showToast('Import failed: ' + err.message);
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be re-imported
    inputEl.value = '';
  },

  _doImportJSON(jsonText) {
    const state = State.getState();
    const result = Store.importJSON(state, jsonText);
    if (result.success) {
      State._persist();
      this._showToast('✅ Data imported! All decks, cards, and learning progress restored.');
      this.navigate();
    } else {
      this._showToast('Import error: ' + result.error);
    }
  },

  _showImportCSV(deckId) {
    this._openModal('Import CSV', `
      <div class="form-group">
        <label>Select CSV file</label>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">
          CSV format: first column = front, second column = back. Header row required.
        </p>
        <input type="file" accept=".csv" id="csv-file-input">
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" data-action="modal-close">Cancel</button>
        <button class="btn btn-primary" data-action="import-csv-confirm" data-deck-id="${deckId}">Import</button>
      </div>
    `);
  },

  _handleImportPreset() {
    const state = State.getState();
    if (Views._deckImported(state)) {
      this._showToast('✅ Deck này đã được import rồi!');
      return;
    }
    const result = Store.importJSON(state, JSON.stringify(PRESET_DECK));
    if (result.success) {
      State._persist();
      this._showToast('✅ Đã import 100 câu Luật Hành chính!');
      Router.navigate();
    } else {
      this._showToast('Import lỗi: ' + result.error);
    }
  },

  _doImportCSV(btn) {
    const deckId = btn.dataset.deckId;
    const fileInput = document.getElementById('csv-file-input');
    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      this._showToast('Please select a CSV file');
      return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const state = State.getState();
      const result = Store.importCSV(state, e.target.result, deckId);
      if (result.success) {
        State._persist();
        this._closeModal();
        this._showToast(`Imported ${result.count || 0} cards!`);
        this.navigate();
      } else {
        this._showToast('Import error: ' + result.error);
      }
    };
    reader.readAsText(file);
  },

  // ---- Settings ----

  _updateNumberSetting(btn) {
    const setting = btn.dataset.setting;
    const val = parseInt(btn.value);
    if (isNaN(val) || val < 1) {
      btn.value = State.getState().settings[setting];
      return;
    }
    State.updateSettings({ [setting]: val });
  },

  _confirmResetAll() {
    this._pendingConfirm = { action: 'reset-all' };
    this._openModal('Reset All Data', `
      <div class="confirm-body">
        <p>This will permanently delete ALL decks, cards, stats, and settings. This cannot be undone!</p>
        <p style="font-weight:600;color:var(--danger);">Are you absolutely sure?</p>
        <div class="confirm-actions">
          <button class="btn btn-secondary" data-action="confirm-no">Cancel</button>
          <button class="btn btn-danger" data-action="confirm-yes">Yes, Reset Everything</button>
        </div>
      </div>
    `);
  }
};

// ===== 8. INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize state
  State.init();

  // Set theme button text
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const isDark = State.getState().settings.theme === 'dark';
    themeBtn.textContent = isDark ? '☀️' : '🌙';
  }

  // Start router
  Router.init();
});