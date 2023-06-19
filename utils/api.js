import {http} from "./http.js"
export function getBanner(data) {
  return http({
    url: '/user/getHomeBanner',
    method: "GET",
    atType: "no",
	data
  })
}
export function getListTest(data) {
  return http({
    url: '/user/list',
    method: "GET",
    atType: "no",
	data
  })
}
export function addTest(data) {
  return http({
    url: '/user/add',
    method: "POST",
    atType: "no",
	notForm: true,
	data
  })
}

export function updateTest(data) {
  return http({
    url: '/user/update',
    method: "PUT",
    atType: "no",
	notForm: true,
	data
  })
}
export function login(data) {
  return http({
    url: '/user/login',
    method: "GET",
    atType: "no",
	notForm: true,
	data
  })
}
//推荐
export function dataIndextj(data) {
  return http({
    url: '/nap/p/dataIndextj.jsp?vt=9',
    method: "GET",
    atType: "no",
	data
  })
}
//推荐-验收
export function dataIndextj_ys(data) {
  return http({
    url: '/nap/c/t_dataIndextj.jsp?vt=9',
    method: "GET",
    atType: "no",
	data
  })
}
//福利
export function dataIndexfl(data) {
  return http({
    url: '/nap/c/dataIndexfl.jsp?vt=9',
    method: "GET",
    atType: "no",
	data
  })
}
//书单
export function dataIndexsd(data) {
  return http({
    url: '/nap/p/dataIndexsd.jsp?vt=9',
    method: "GET",
    atType: "no",
	data
  })
}
//书单-验收
export function dataIndexsd_ys(data) {
  return http({
    url: '/nap/c/t_dataIndexsd.jsp?vt=9',
    // url: '/nap/c/dataIndexsd_ys.jsp?vt=9',
    method: "GET",
    atType: "no",
	data
  })
}
//男生
export function dataIndexyc(data) {
  return http({
    url: '/nap/p/dataIndexyc.jsp?vt=9',
    method: "GET",
    atType: "no",
	data
  })
}
export function dataIndexyc_ys(data) {
  return http({
    url: '/nap/c/dataIndexyc_ys.jsp?vt=9',
    method: "GET",
    atType: "no",
	data
  })
}
//女生
export function dataIndexns(data) {
  return http({
    url: '/nap/p/dataIndexns.jsp?vt=9',
    method: "GET",
	atType: "no",
	data
  })
}
export function dataIndexns_ys(data) {
  return http({
    url: '/nap/c/dataIndexGirl.jsp?vt=9',
    method: "GET",
	atType: "no",
	data
  })
}
//出版
export function dataIndexcb(data) {
  return http({
    url: '/nap/p/dataIndexcb.jsp?vt=9',
    method: "GET",
    atType: "no",
	data
  })
}
export function dataIndexcb_ns(data) {
  return http({
    url: '/nap/c/dataIndexcb_ns.jsp?vt=9',
    method: "GET",
    atType: "no",
	data
  })
}
//免费页
export function iosmfsy(data) {
  return http({
    url: '/nap/p/IOSmfsy.jsp?vt=9',
    method: "GET",
	atType: "no",
	data
  })
}
export function IOSmfsy_ys(data) {
  return http({
    url: '/nap/c/IOSmfsy_ys.jsp?vt=9',
    method: "GET",
	atType: "no",
	data
  })
}
//书籍信息
export function wecharDetail(data) {
  return http({
    // url: '/nap/p/wecharDetail.jsp?vt=9&bid=495582534&dataFrom=5&portalType=32',
    url: '/nap/p/wecharDetail.jsp?',
    method: "POST",
	atType: "no",
	data
  })
}
//书籍信息-验收
export function wecharDetail_ys(data) {
  return http({
    // url: '/nap/p/wecharDetail.jsp?vt=9&bid=495582534&dataFrom=5&portalType=32',
    url: '/nap/c/wecharDetail_ys.jsp?',
    method: "POST",
	atType: "no",
	data
  })
}
//是否书籍是黑名单
export function bookSheetService(data) {
  return http({
    url: '/nap/f/ms.booksheet.bookSheetService/isSnsBlack.json',
    method: "GET",
	data
  })
}
//书籍价格 
export function getBookfeeInfo(data) {
  return http({
    url: '/nap/f/ms.content.ContentService/getBookFeeInfo.json',
    method: "GET",
	data
  })
}
//最后阅读信息
export function getLatelyReadDataApi(data) {
  return http({
    url: '/nap/f/ms.content.ContentService/bkDetailButton.json',
    method: "POST",
	// atType: "no",
	data
  })
}
//登录
export function asyncAuthenticate(data) {
  return http({
    url: '/api/asyncAuthenticate',
    method: "POST",
	data,
	notForm: true,
  })
}
// 更新书架
export function updateBooksheet(data) {
  return http({
    url: '/nap/a/ms.wechat.wechatService/getBookmark.json?',
    method: "POST",
	data,
  })
}
// 加入书架
export function addBookmark(data) {
  return http({
    url: '/nap/a/ms.wechat.wechatService/addBookmark.json?',
    method: "POST",
	data,
  })
}
// 分享海报
export function makeBookPosterAction(data) {
  return http({
    url: '/nap/a/ms.wechat.wechatService/makeBookPosterAction.json?',
    method: "POST",
	data,
  })
}
// 书友圈第一页
export function pllb(data) {
  return http({
    url: '/nap/p/wx_pllb.jsp?vt=9&cm=D00104T9&dataFrom=5',
    method: "POST",
	atType: "no",
	data,
  })
}
// 书友圈上拉刷新
export function bookCommentArray(data) {
  return http({
    url: '/nap/f/ms.sns.snsService/bookCommentArray.json',
    method: "GET",
	data,
  })
}
// 评论详情
export function wx_plxq(data) {
  return http({
    url: '/nap/p/wx_plxq.jsp',
    // url: '/nap/c/wx_plxq_ys.jsp',
    method: "POST",
	data,
  })
}
// 评论详情 上拉刷新
export function bookCommentDetail(data) {
  return http({
    url: '/nap/f/ms.sns.snsService/bookCommentDetail.json',
    method: "GET",
	data,
  })
}
// 阅读页wechat_chapterInfo
export function wechat_chapterInfo(data) {
  return http({
    url: '/nap/p/wechat_chapterInfo.jsp',
    method: "POST",
	data,
  })
}
// 阅读页目录
export function getCharpterListAction(data) {
  return http({
    url: '/nap/f/ms.content.wechatService/getCharpterListAction.json?',
    method: "POST",
	data,
  })
}
// 详情页目录
export function getDetailCharpterList(data) {
  return http({
    url: '/nap/f/ms.content.wechatService/getCharpterListAction.json?',
    method: "POST",
	atType: "no",
	data,
  })
}
// 获取客服引导
export function mpgDown(data) {
  return http({
    url: '/rbc/p/mpgDown.jsp',
    method: "GET",
	data,
  })
}
// 获取客服引导
export function downloadBoot(data) {
  return http({
    url: '/rbc/p/downloadBoot.jsp',
    method: "GET",
	atType: "no",
	data,
  })
}
// 是否显示去充值按钮，当审核版本不显示，正式上线后可选择显示 ,每次上线新版本前记得选择否
export function wechat_isOrder(data) {
  return http({
    url: '/nap/p/wechat_isOrder.jsp',
    // url: '/nap/p/wechat_isOrderys.jsp',
    method: "GET",
	data,
  })
}
// 图书价格
export function bookFeePage(data) {
  return http({
    url: '/nap/p/bookFeePage.jsp',
    method: "POST",
	data,
  })
}
// 充值选项列表
export function wxRechargePage(data) {
  return http({
    url: '/nap/p/wxRechargePage.jsp',
    method: "GET",
	data,
  })
}
// 充值选项列表-测试
export function wxRechargePage_cs(data) {
  return http({
    url: '/nap/p/wxRechargePage_cs.jsp',
    method: "GET",
	data,
  })
}
// 查询充值是否成功
export function alipayDealAction(data) {
  return http({
    url: '/nap/a/ms.trade.tradeService/alipayDealAction.json',
    method: "GET",
	data,
  })
}
// 查询订购是否成功
export function getSubOperateResult(data) {
  return http({
    url: '/nap/a/ms.trade.tradeService/getSubOperateResult.json',
    method: "GET",
	data,
  })
}
// 设置自动订购
export function setAutoSubSet(data) {
  return http({
    url: '/nap/a/ms.trade.wechatService/setAutoSubSet.json',
    method: "POST",
	data,
  })
}
//   getPhoneNum
export function wxGetWalletInfo(data) {
  return http({
    url: '/nap/p/wxGetWalletInfo.jsp',
    method: "GET",
	data,
  })
}
//   getPhoneNum 验收
export function wxGetWalletInfoYs(data) {
  return http({
    url: '/nap/c/wxGetWalletInfo_ys.jsp',
    method: "GET",
	data,
  })
}
//   书架列表
export function wechat_booksheet(data) {
  return http({
    url: '/nap/p/wechat_booksheet.jsp',
    // url: '/nap/c/booksheetData.jsp',
    method: "GET",
	data,
  })
}
//   书架删除
export function batchDeleteBookmark(data) {
  return http({
    url: '/nap/a/ms.wechat.wechatService/batchDeleteBookmark.json',
    method: "POST",
	data,
  })
}
//   自动订购列表
export function wxAutoSubPage(data) {
  return http({
    url: '/nap/p/wxAutoSubPage.jsp',
    method: "GET",
	data,
  })
}
//   我的订购列表
export function orderedBooks(data) {
  return http({
    url: '/nap/p/orderedBooks.jsp',
    method: "GET",
	data,
  })
}
//   我的订购列表-验收
export function orderedBooks_cs(data) {
  return http({
    url: '/nap/c/orderedBooks_cs.jsp',
    method: "GET",
	data,
  })
}
//   书库tab列表
export function getClientNavRankCatalogConfig(data) {
  return http({
    url: '/nap/f/ms.content.wechatService/getClientNavRankCatalogConfig.json',
    method: "GET",
	atType: "no",
	data,
  })
}
//   书库分类
export function getClassifyListConfigByTabId(data) {
  return http({
    url: '/nap/f/ms.content.wechatService/getClassifyListConfigByTabId.json',
    method: "GET",
	atType: "no",
	data,
  })
}
//   排行
export function getBookRankListByTabId(data) {
  return http({
    url: '/nap/f/ms.content.wechatService/getBookRankListByTabId.json',
    method: "GET",
	atType: "no",
	data,
  })
}
//   书库列表
export function getClassifyBookResultList(data) {
  return http({
    url: '/nap/f/ms.content.wechatService/getClassifyBookResultList.json',
    method: "GET",
	data,
  })
}
//   书库跳转书库列表
export function getClassifyBookCondition(data) {
  return http({
    url: '/nap/f/ms.content.wechatService/getClassifyBookCondition.json',
    method: "GET",
	atType: "no",
	data,
  })
}
//   热搜
export function getSearchHotWord(data) {
  return http({
    url: '/nap/f/ms.search.searchService/getSearchHotWord.json',
    method: "GET",
	atType: "no",
	data,
  })
}
// 获取搜索默认词
export function getSearchRecommendWord(data) {
  return http({
    url: '/nap/f/ms.search.searchService/getSearchRecommendWord.json',
    method: "GET",
	atType: "no",
	data,
  })
}
// 搜索联想词
export function searchSuggestion(data) {
  return http({
    url: '/nap/p/searchSuggestion.jsp',
    method: "GET",
	data,
  })
}
// 搜索
export function wechat_sarch_cs(data) {
  return http({
    url: '/nap/p/wechat_sarch_cs.jsp',
    // url: '/nap/p/t_test_search2.jsp',
    method: "GET",
	data,
  })
}
// 搜索结果上拉加载
export function getSearchBookResult(data) {
  return http({
    url: '/nap/f/ms.search.searchService/getSearchBookResult.json',
    method: "GET",
	data,
  })
}
// 作者信息
export function wxauthorPage(data) {
  return http({
    url: '/nap/p/wxauthorPage.jsp',
    method: "GET",
	data,
  })
}
// 分页作品
export function getWorksList(data) {
  return http({
    url: '/nap/f/ms.content.AuthorService/getWorksList.json',
    method: "GET",
	data,
  })
}
// 标签页首页
export function markbook(data) {
  return http({
    url: '/rbc/p/markbook.jsp',
    method: "GET",
	data,
  })
}
// 角色图书列表
export function search_rolebook(data) {
  return http({
    url: '/nap/p/search_rolebook.jsp',
    method: "GET",
	data,
  })
}
// 系列详情
export function seriesDetail(data) {
  return http({
    url: '/nap/p/seriesDetail.jsp',
    method: "GET",
	data,
  })
}
// 系列触底
export function getSeriesDetail(data) {
  return http({
    url: '/nap/a/ms.search.searchService/getSeriesDetail.json',
    method: "GET",
	data,
  })
}
// 周热搜
export function search_ph_wk(data) {
  return http({
    url: '/rbc/p/search_ph_wk.jsp',
    method: "GET",
	data,
  })
}
// 月热搜
export function search_ph_mon(data) {
  return http({
    url: '/rbc/p/search_ph_mon.jsp',
    method: "GET",
	data,
  })
}
// 年热搜
export function search_ph_tot(data) {
  return http({
    url: '/rbc/p/search_ph_tot.jsp',
    method: "GET",
	data,
  })
}
// 邀请阅读书籍列表
export function getNodeBookList(data) {
  return http({
    url: '/nap/a/ms.wechat.wechatService/getNodeBookList.json',
    method: "GET",
	data,
  })
}
// 邀请阅读书籍列表
export function senderInvitationAction(data) {
  return http({
    url: '/nap/a/ms.wechat.wechatService/senderInvitationAction.json',
    method: "POST",
	data,
  })
}
// 已邀请好友列表
export function getChapterOrFirendList(data) {
  return http({
    url: '/nap/a/ms.wechat.wechatService/getChapterOrFirendList.json',
    method: "POST",
	data,
  })
}
// 助力
export function receiveInvitationAction(data) {
  return http({
    url: '/nap/a/ms.wechat.wechatService/receiveInvitationAction.json',
    method: "POST",
	data,
  })
}
// 下发激励奖励
export function wx_free_monthpack(data) {
  return http({
    url: '/nap/p/wx_free_monthpack.jsp',
    method: "GET",
	data,
  })
}
// 获取活动列表
export function bndsdxcx(data) {
  return http({
    url: '/nap/p/bndsdxcx.jsp',
    method: "GET",
	atType: "no",
	data,
  })
}
// 阅读5分钟抽奖活动页
export function wx_read_draw(data) {
  return http({
    url: '/nap/p/wx_read_draw.jsp',
    method: "POST",
	data,
  })
}



