#!/usr/bin/env bash

# Convert context URL to an array
mapfile -t CONTEXT_URL_ITEMS < <(echo "$GITPOD_WORKSPACE_CONTEXT_URL" | tr '/' '\n')

# Install latest pnpm
PNPM_INSTALL_SCRIPT="$(mktemp)"
curl -fsSL https://get.pnpm.io/install.sh -o "$PNPM_INSTALL_SCRIPT"
SHELL="$(command -v bash)" bash "$PNPM_INSTALL_SCRIPT"
rm -f "$PNPM_INSTALL_SCRIPT"

# Check if Gitpod started from a specific example directory in the repository
if [ "${CONTEXT_URL_ITEMS[7]}" = "examples" ]; then
    EXAMPLE_PROJECT=${CONTEXT_URL_ITEMS[8]}
# Check it Gitpod started with $OPENCLI_NEW environment variable
elif [ -n "$OPENCLI_NEW" ]; then
    EXAMPLE_PROJECT="$OPENCLI_NEW"
# Otherwise, set the default example project - 'starter'
else
    EXAMPLE_PROJECT="starter"
fi
