#!/usr/bin/env node

/**
 * 自动化开发环境设置脚本
 *
 * 该脚本会自动安装和配置：
 * - Prettier (代码格式化)
 * - Husky (Git hooks)
 * - lint-staged (提交前检查)
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function exec(command, description) {
  try {
    log(`\n📦 ${description}...`, colors.blue);
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} - 完成`, colors.green);
    return true;
  } catch (error) {
    log(`❌ ${description} - 失败`, colors.red);
    return false;
  }
}

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description} 已存在`, colors.green);
    return true;
  } else {
    log(`❌ ${description} 不存在`, colors.yellow);
    return false;
  }
}

async function main() {
  log('\n🚀 开始配置开发环境...\n', colors.cyan);

  // 检查 Node.js 版本
  const nodeVersion = process.version;
  log(`Node.js 版本: ${nodeVersion}`, colors.blue);

  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 20) {
    log('⚠️  警告: 建议使用 Node.js 20 或更高版本', colors.yellow);
  }

  // 步骤 1: 安装依赖
  log('\n📦 步骤 1/5: 检查并安装依赖', colors.cyan);

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const devDeps = packageJson.devDependencies || {};

  const requiredDeps = ['prettier', 'husky', 'lint-staged', 'prettier-plugin-tailwindcss'];
  const missingDeps = requiredDeps.filter(dep => !devDeps[dep]);

  if (missingDeps.length > 0) {
    log(`缺少依赖: ${missingDeps.join(', ')}`, colors.yellow);
    exec('npm install', '安装所有依赖');
  } else {
    log('所有依赖已安装 ✅', colors.green);
  }

  // 步骤 2: 检查配置文件
  log('\n📝 步骤 2/5: 检查配置文件', colors.cyan);

  const configFiles = [
    { path: '.prettierrc', name: 'Prettier 配置' },
    { path: '.prettierignore', name: 'Prettier 忽略文件' },
    { path: '.lintstagedrc.json', name: 'lint-staged 配置' },
  ];

  configFiles.forEach(({ path: filePath, name }) => {
    checkFile(filePath, name);
  });

  // 步骤 3: 初始化 Husky
  log('\n🪝 步骤 3/5: 初始化 Husky', colors.cyan);

  if (!fs.existsSync('.husky')) {
    exec('npx husky init', '初始化 Husky');
  } else {
    log('Husky 已初始化 ✅', colors.green);
  }

  // 确保 pre-commit hook 存在且正确
  const preCommitPath = '.husky/pre-commit';
  const preCommitContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`;

  if (!fs.existsSync(preCommitPath)) {
    fs.writeFileSync(preCommitPath, preCommitContent);
    fs.chmodSync(preCommitPath, '755');
    log('创建 pre-commit hook ✅', colors.green);
  } else {
    log('pre-commit hook 已存在 ✅', colors.green);
  }

  // 步骤 4: 运行格式化
  log('\n🎨 步骤 4/5: 格式化代码', colors.cyan);

  const shouldFormat = process.argv.includes('--format');
  if (shouldFormat) {
    exec('npm run format', '格式化所有代码');
  } else {
    log('跳过代码格式化（使用 --format 参数启用）', colors.yellow);
  }

  // 步骤 5: 验证设置
  log('\n✅ 步骤 5/5: 验证设置', colors.cyan);

  exec('npm run format:check', '检查代码格式');
  exec('npm run type-check', 'TypeScript 类型检查');

  // 完成
  log('\n🎉 开发环境配置完成！\n', colors.green);

  log('下一步操作:', colors.cyan);
  log('  1. 查看 SETUP_GUIDE.md 了解详细配置', colors.blue);
  log('  2. 配置 GitHub Secrets 启用 CI/CD', colors.blue);
  log('  3. 运行 npm run dev 启动开发服务器', colors.blue);
  log('  4. 尝试提交代码测试 Git hooks', colors.blue);

  log('\n常用命令:', colors.cyan);
  log('  npm run dev           - 启动开发服务器', colors.blue);
  log('  npm run format        - 格式化代码', colors.blue);
  log('  npm run lint          - 检查代码质量', colors.blue);
  log('  npm run type-check    - 类型检查', colors.blue);
  log('  npm run build         - 构建项目', colors.blue);

  log('\n📚 文档:', colors.cyan);
  log('  SETUP_GUIDE.md        - 完整配置指南', colors.blue);
  log('  USER_MANUAL.md        - 用户手册', colors.blue);
  log('  OPTIMIZATION_PLAN.md  - 优化方案', colors.blue);

  log('');
}

main().catch(error => {
  log(`\n❌ 设置失败: ${error.message}`, colors.red);
  process.exit(1);
});
