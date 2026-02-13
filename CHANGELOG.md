# page_type → pageType Unification Plan

## 背景

**问题诊断**：
- `lib/tracking.ts` 同时存在两套类型系统：
  - `PageType` (snake_case) - 旧系统，用于 `revenue_outbound` 和历史事件
  - `pageType` (camelCase) - 新系统，用于 `cta_click` 和 `cta_impression`

**影响**：
- Umami Properties 显示两套数据，导致历史数据污染
- 前端组件可能直接导入 `PageType`，导致类型错误

## 目标

**统一为 `pageType`**，单一数据源，消除歧义

---

## ✅ 阶段 2：完成（2026-02-13）

### 2.1 更新 `lib/tracking.ts` 核心类型

**完成的修改**：
- 移除所有 `page_type` 字段（snake_case）
- 移除所有 "Transitional dual-write" 注释
- 统一使用 `pageType` (camelCase)

**修改的接口**：
- `RevenueOutboundEvent` - 移除 `page_type`，保留 `pageType`
- `CtaImpressionEvent` - 移除 `page_type`，保留 `pageType`
- `CtaClickEvent` - 移除 `page_type`，保留 `pageType`
- `RealityCheckImpressionEvent` - 移除 `page_type`，保留 `pageType`

**修改的函数**：
- `trackRevenueOutbound()` - 只发送 `pageType`
- `trackCtaImpression()` - 只发送 `pageType`
- `trackCtaClick()` - 只发送 `pageType`
- `trackRealityCheckImpression()` - 只发送 `pageType`

### 2.2 更新测试文件

**修改的文件**：
- `tests/preflight-tracking.spec.ts`
  - 更新 `validateRevenueOutboundSchema()` REQUIRED_FIELDS
  - 更新所有断言从 `page_type` → `pageType`
- `tests/preflight-production-smoke.spec.ts`
  - 更新所有断言从 `page_type` → `pageType`

### 2.3 验证结果

```bash
npm run build
# ✅ TypeScript 编译通过
# ✅ 所有页面生成成功
```

---

## 阶段 3：清理历史数据（待执行）

### 3.1 清理 Umami Properties

```bash
# 在 Umami 仪表板清除 `page_type` 历史数据
# （需要先手动操作，或等待 7 天自动过期）
```

### 3.2 重置 Umami 脚本

```bash
# 刷新脚本，重新开始计数
```

---

## 执行状态

- [x] ✅ 阶段 1 完成：类型别名（向后兼容）- 跳过，直接执行阶段 2
- [x] ✅ 阶段 2 完成：批量替换 `page_type` → `pageType`
- [ ] ⏳ 阶段 3 待执行：清理历史数据（可选）
- [ ] ⏳ 阶段 4 待执行：删除旧类型别名（7 天后）

---

## 修改文件清单

1. `lib/tracking.ts` - 移除所有 `page_type`，统一使用 `pageType`
2. `tests/preflight-tracking.spec.ts` - 更新测试断言
3. `tests/preflight-production-smoke.spec.ts` - 更新测试断言

---

## 验收标准

- [x] TypeScript 编译无错误
- [x] Build 成功
- [x] 所有 `page_type` 已替换为 `pageType`
- [x] 测试文件已更新
- [x] 无 dual-write 代码
- [ ] Umami 事件数据只显示 `pageType`
- [ ] 历史数据已清理（可选）
